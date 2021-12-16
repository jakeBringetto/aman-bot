
const quotes = require('./quotes.js');
const thanos_quotes = require('./thanos.js');
const black_hole_pics = require('./blackhole.js');
const aman_advice = require('./advice.js');
const { Client, Intents, DiscordAPIError } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });

require('dotenv').config();
const bot_key = process.env.BOT_KEY;
const hidden_command = process.env.HIDDEN_COMMAND_1;
const hidden_word = process.env.HIDDEN_WORD_1;
const prefix = 'aman';
client.once('ready', () => {
    console.log('amanbot has the golden arm!!');
    
});

var i = 0;                  

function myLoop(message, user) {         
  setTimeout(function() {   
    message.channel.send(`<@${user.toString()}>`)   
    i++;                   
    if (i < 10) {          
      myLoop(message, user);             
    }                       
  }, 1000) // 1s delay
}

function wordLoop(message, message_to) {        
    setTimeout(function() {   
      message.channel.send(message_to)   
      i++;                    
      if (i < 20) {           
        wordLoop(message, message_to);             
      }                       
    }, 500)
  }
client.on('message', message => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    if (args.length < 2) return;
    // const command = args.shift().toLowerCase();

    
    if (args[1].toLowerCase() === 'gabe'){
        message.channel.send("hi gabe");
    } else if (args[1].toLowerCase() === 'threat'){
        message.channel.send({files: ["IMG_1618.jpeg"]});
    } else if (args[1].toLowerCase() === 'commands'){
        var commandString = '`gabe` to say "hi gabe" \n' + 
        ' `threat` to see aman-gabe violence\n' + 
        ' `warzone` to ping the war apes\n' + 
        ' `spam <username> <message>` to send dm to user\n' + 
        ' `annoy <username>` to ping user 10 times\n' + 
        ' `quote` to return a random quote\n' + 
        ' `thanos` to return a random thanos quote\n' +
        ' `mock` to mock the previous sentence\n' +
        ' `blackhole` to show a random black hole\n' +
        ' `hardly` return I hardly know her joke if it applies\n' +
        ' `advice` for some killer advice!!!!!\n' +
        ' `todd` to bring up todd-yu.com\n' +
        ' `avatar` to show user profile picture\n' +
        ' `wiki` to pull up gitbook wiki';
        message.channel.send(commandString);
    } else if (args[1].toLowerCase() === 'warzone'){
        const milton = client.users.cache.find(User => User.username == 'miltonzhang559').id;
        const aaron = client.users.cache.find(User => User.username == 'AaronRPG').id;
        const amandeep = client.users.cache.find(User => User.username == 'God-').id;
        const austin = client.users.cache.find(User => User.username == 'amann06').id;
        const jake = client.users.cache.find(User => User.username == 'jake-').id;
        message.channel.send(`<@${milton.toString()}> <@${aaron.toString()}> <@${amandeep.toString()}> <@${austin.toString()}> <@${jake.toString()}> assemble`);
    } else if (args[1].toLowerCase() === 'spam') {
        const temp = client.users.cache.find(User => User.username === args[2]).id;
        const message_to = args.slice(3).join(" ");
        client.users.cache.get(temp.toString()).send(message_to);
    } else if (args[1].toLowerCase() === 'annoy'){
        i = 0;
        const temp = client.users.cache.find(User => User.username === args[2]);
        if (!temp | temp.bot) return;
        myLoop(message, temp.id);
    } else if (args[1].toLowerCase() === hidden_command){
        i = 0;
        wordLoop(message, hidden_word);
    } else if (args[1].toLowerCase() === 'quote') {
        var index = Math.floor(Math.random() * quotes.length);
        message.channel.send(quotes[index]);
    } else if (args[1].toLowerCase()  === 'thanos') {
        var than_index = Math.floor(Math.random() * thanos_quotes.length);
        message.channel.send(thanos_quotes[than_index]);
    } else if (args[1].toLowerCase() === 'mock') {
        message.channel.messages.fetch({limit: 3})
        .then(messageMappings => {
        let messages = Array.from(messageMappings.values());
        let previousMessage = messages[1].content;
        for (var j = 0; j <=previousMessage.length / 3; ++j){
            var word_index = Math.floor(Math.random() * previousMessage.length);
            previousMessage = previousMessage.substring(0, word_index) + previousMessage[word_index].toUpperCase() + previousMessage.substring(word_index + 1);
        }
        message.channel.send(previousMessage.slice(0, 1999));
        })
        .catch(error => console.log(error))
    } else if (args[1].toLowerCase() === 'blackhole'){
        const random_pic = black_hole_pics[Math.floor(Math.random() * black_hole_pics.length)];
        message.channel.send({files: [random_pic]});
    } else if (args[1].toLowerCase() === 'help'){
        message.channel.send('Use `aman commands` to see the commands. If you have a problem, bring it to the developers');
    } else if (args[1].toLowerCase() === 'devs'){
        message.channel.send('Jake');
    } else if (args[1].toLowerCase() === 'deep'){
        message.channel.send('Action TBD. YOU HAVE BEEN WARNED');
    } else if (args[1].toLowerCase() === 'hardly') {
        message.channel.messages.fetch({limit: 3})
        .then(messageMappings => {
        let messages_two = Array.from(messageMappings.values());
        let previousMessage = messages_two[1].content;
        var prev_arr = previousMessage.split(" ");
        for (var k = 0; k < prev_arr.length; ++k){
            if (prev_arr[k].endsWith("er") | prev_arr[k].endsWith("or") | prev_arr[k].endsWith("ar") | prev_arr[k].endsWith("er.") | prev_arr[k].endsWith("er!")){
                if (prev_arr[k].length >= 1900 | prev_arr[k].startsWith('ni')) {
                    message.channel.send('too long');
                    return;
                }
                message.channel.send(prev_arr[k] + '? I hardly know her!');
                break;
            }
        }
        })
        .catch(error => console.log(error))
    } else if (args[1].toLowerCase() === 'advice'){
        var ad_index = Math.floor(Math.random() * aman_advice.length);
        message.channel.send(aman_advice[ad_index]);
    } else if (args[1].toLowerCase() === 'todd'){
        message.channel.send("https://todd-yu.com");
    } else if (args[1].toLowerCase() === 'avatar'){
        const target = client.users.cache.find(User => User.username === args[2]);
        if (!target) return;
        if (target.bot) return;
        message.channel.send({files: [
            {
                attachment: target.displayAvatarURL(),
                name: "avatar.png"
            }
        ]})
    } else if (args[1].toLowerCase() === 'wiki'){
        message.channel.send("https://github.com/jakeBringetto/Centralized-Notes-Store");
    } 
});

client.login(bot_key);