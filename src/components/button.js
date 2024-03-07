const { ButtonBuilder } = require("discord.js")

const back = (hasPrev) => new ButtonBuilder()
    // .setLabel('Back')
    .setEmoji("⏮️")
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Secondary')
    .setDisabled(hasPrev)

const skip = new ButtonBuilder()
    // .setLabel('Skip')
    .setEmoji("⏭️")
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Secondary')

const resume = new ButtonBuilder()
    // .setLabel('Resume')
    .setEmoji("▶️")
    .setCustomId(JSON.stringify({ffb: 'resume'}))
    .setStyle('Secondary')

const pause = new ButtonBuilder()
    // .setLabel('Pause')
    .setEmoji("⏸️")
    .setCustomId(JSON.stringify({ffb: 'pause'}))
    .setStyle('Secondary')

const methods = ['Disabled', 'Track', 'Queue']
const loop = (mode) => new ButtonBuilder()
    .setLabel(methods[mode])
    .setEmoji("🔁")
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
// const lyrics = new ButtonBuilder()
//     .setLabel('lyrics')
//     .setCustomId(JSON.stringify({ffb: 'lyrics'}))
//     .setStyle('Secondary')

module.exports = {
    back,
    skip,
    resume,
    pause,
    loop,
    // lyrics
}