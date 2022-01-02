const img = require('images-scraper');

const google = new img({
    puppeteer : {
        headless : true,
    }
})

async function find(message, query){
    if(!query) return message.channel.send('Please enter a search query')
    message.channel.send('finding image')
    const results = await google.scrape(query, 1)
    message.channel.send(results[0].url);
}

module.exports = find;