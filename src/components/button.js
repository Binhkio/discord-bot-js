const { ButtonBuilder } = require("discord.js")

const back = (hasPrev) => new ButtonBuilder()
    // .setLabel('Back')
    .setEmoji("⏮️")
    .setCustomId(JSON.stringify({ ffb: 'back' }))
    .setStyle('Secondary')
    .setDisabled(!hasPrev)

const skip = new ButtonBuilder()
    // .setLabel('Skip')
    .setEmoji("⏭️")
    .setCustomId(JSON.stringify({ ffb: 'skip' }))
    .setStyle('Secondary')

const resume = new ButtonBuilder()
    // .setLabel('Resume')
    .setEmoji("▶️")
    .setCustomId(JSON.stringify({ ffb: 'resume' }))
    .setStyle('Secondary')

const pause = new ButtonBuilder()
    // .setLabel('Pause')
    .setEmoji("⏸️")
    .setCustomId(JSON.stringify({ ffb: 'pause' }))
    .setStyle('Secondary')

const methods = ['Không lặp', 'Lặp đơn', 'Lặp tất cả']
const icons = ['🚫', '🔂', '🔁']
const loop = (mode) => new ButtonBuilder()
    .setLabel(methods[mode])
    .setEmoji(icons[mode])
    .setCustomId(JSON.stringify({ ffb: 'loop' }))
    .setStyle('Secondary')

const stop = new ButtonBuilder()
    .setLabel('Stop')
    .setEmoji("⛔")
    .setCustomId(JSON.stringify({ffb: 'stop'}))
    .setStyle('Danger')

module.exports = {
    back,
    skip,
    resume,
    pause,
    loop,
    stop,
}