
const quotes = require('./quotes.js');
const thanos_quotes = require('./thanos.js');
const black_hole_pics = require('./blackhole.js');
const aman_advice = require('./advice.js');
const translate_response = require('./translate.js');
const mimic_fn = require('./mimic.js');
const { Client, Intents, DiscordAPIError } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });
const find = require('./image.js');


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

    switch (args[1].toLowerCase()){
        case 'gabe':
            message.channel.send("hi gabe");
            break;
        case 'threat':
            message.channel.send({files: ["IMG_1618.jpeg"]});
            break;
        case 'commands':
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
            ' `wiki` to pull up gitbook wiki\n' +
            ' `everyone` to spam everyone 20 times\n' +
            ' `image <search>` to search for an image\n' +
            ' `translate <target language> sentence` to translate a sentence\n' +
            ' `mimic <username>` to gen comment in the style of a user\n' + 
            ' `mimic_tune <username> limit` to do mimic with specific number of training sentences';
            message.channel.send(commandString);
            break;
        case 'warzone':
            const milton = client.users.cache.find(User => User.username == 'miltonzhang559').id;
            const aaron = client.users.cache.find(User => User.username == 'AaronRPG').id;
            const amandeep = client.users.cache.find(User => User.username == 'God-').id;
            const austin = client.users.cache.find(User => User.username == 'amann06').id;
            const jake = client.users.cache.find(User => User.username == 'jake-').id;
            message.channel.send(`<@${milton.toString()}> <@${aaron.toString()}> <@${amandeep.toString()}> <@${austin.toString()}> <@${jake.toString()}> assemble`);
            break;
        case 'spam':
            const user_id = client.users.cache.find(User => User.username === args[2]).id;
            const message_to = args.slice(3).join(" ");
            client.users.cache.get(user_id.toString()).send(message_to);
            break;
        case 'annoy':
            i = 0;
            const user_obj = client.users.cache.find(User => User.username === args[2]);
            if (!user_obj | user_obj.bot) return;
            myLoop(message, user_obj.id);
            break;
        case hidden_command:
            i = 0;
            wordLoop(message, hidden_word);
            break;
        case 'quote':
            var index = Math.floor(Math.random() * quotes.length);
            message.channel.send(quotes[index]);
            break;
        case 'thanos':
            var than_index = Math.floor(Math.random() * thanos_quotes.length);
            message.channel.send(thanos_quotes[than_index]);
            break;
        case 'mock':
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
            break;
        case 'blackhole':
            const random_pic = black_hole_pics[Math.floor(Math.random() * black_hole_pics.length)];
            message.channel.send({files: [random_pic]});
            break;
        case 'help':
            message.channel.send('Use `aman commands` to see the commands. If you have a problem, bring it to the developers');
            break;
        case 'devs':
            message.channel.send('Jake');
            break;
        case 'deep':
            message.channel.send('Action TBD. YOU HAVE BEEN WARNED');
            break;
        case 'hardly':
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
            break;
        case 'advice':
            var ad_index = Math.floor(Math.random() * aman_advice.length);
            message.channel.send(aman_advice[ad_index]);
            break;
        case 'todd':
            message.channel.send("https://todd-yu.com");
            break;
        case 'avatar':
            const target = client.users.cache.find(User => User.username === args[2]);
            if (!target) return;
            if (target.bot) return;
            message.channel.send({files: [
                {
                    attachment: target.displayAvatarURL(),
                    name: "avatar.png"
                }
            ]})
            break;
        case 'wiki':
            message.channel.send("https://github.com/jakeBringetto/Centralized-Notes-Store");
            break;
        case 'image':
            const query = args.slice(2).join(" ");
            find(message, query);
            break;
        case 'everyone':
            wordLoop(message, '@everyone');
            break;
        case 'translate':
            const language = args[2];
            const message_to_translate = args.slice(3).join(" ");
            const prompt = "Translate this into " + language + ": " + message_to_translate;
            translate_response(message, prompt);
            break;
        case 'mimic':
            const mimic_id = client.users.cache.find(User => User.username === args[2]).id;
            mimic_fn(client, message, mimic_id, 100);
            break;
        case 'mimic_tune':
            const mimic_tune_id = client.users.cache.find(User => User.username === args[2]).id;
            const tune_limit = parseInt(args[3]);
            mimic_fn(client, message, mimic_tune_id, tune_limit);
            break;
    }

});

client.login(bot_key);