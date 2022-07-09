const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function mimic(client, message, userID, limit){
    let sentence_array = [];
    // let inner_promises = [];
    // let outer_promises = [];
    const guildID = message.guild.id;
    client.guilds.cache.get(guildID).channels.cache.forEach(ch => {
        if (ch.type === 'GUILD_TEXT'){
            console.log("0")
            ch.messages.fetch({
                limit: limit
            }).then(messages => {
                const msgs = messages.filter(m => m.author.id === userID)
                msgs.forEach(m => {
                    if (!`${m.content}`.toLowerCase().startsWith('aman')){
                        sentence_array.push(`${m.content}`.replace(/<.*>/, ''));
                    }
                })
                train(sentence_array, message);

            })
        } else {
            return sentence_array;
        }
    })
    Promise.all(sentence_array).then((values) => {
        console.log(values);
     })
}

async function train(sentences, message){
    const prompt = sentences.join(".\n") + "\n\nCan you generate one sentence similar but not the same as the ones above?";
    console.log(prompt);
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      message.channel.send(response.data.choices[0].text)

}

module.exports = mimic;