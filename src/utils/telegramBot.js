const dotenv = require('dotenv')
dotenv.config()
const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
const channel = process.env.TELEGRAM_CHANNEL_ID;
function sendMessage(message){
    bot.telegram.sendMessage(channel,message);
}

module.exports = {bot, sendMessage}