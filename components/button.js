const { ButtonBuilder, ButtonStyle } = require("discord.js");

const back = (hasPrev) =>
  new ButtonBuilder()
    // .setLabel('Back')
    .setEmoji("⏮️")
    .setCustomId(JSON.stringify({ ffb: "back" }))
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(!hasPrev);

const skip = new ButtonBuilder()
  // .setLabel('Skip')
  .setEmoji("⏭️")
  .setCustomId(JSON.stringify({ ffb: "skip" }))
  .setStyle(ButtonStyle.Secondary);

const resume = new ButtonBuilder()
  // .setLabel('Resume')
  .setEmoji("▶️")
  .setCustomId(JSON.stringify({ ffb: "resume" }))
  .setStyle(ButtonStyle.Secondary);

const pause = new ButtonBuilder()
  // .setLabel('Pause')
  .setEmoji("⏸️")
  .setCustomId(JSON.stringify({ ffb: "pause" }))
  .setStyle(ButtonStyle.Secondary);

const methods = ["No-Loop", "Loop"];
const icons = ["🚫", "🔁"]; //'🔂'
const isLoop = (isLoop) =>
  new ButtonBuilder()
    // .setLabel(methods[isLoop ? 1 : 0])
    .setEmoji(icons[isLoop ? 1 : 0])
    .setCustomId(JSON.stringify({ ffb: "loop" }))
    .setStyle(ButtonStyle.Secondary);

const stop = new ButtonBuilder()
  // .setLabel('Stop')
  .setEmoji("⛔")
  .setCustomId(JSON.stringify({ ffb: "stop" }))
  .setStyle(ButtonStyle.Danger);

module.exports = {
  back,
  skip,
  resume,
  pause,
  isLoop,
  stop,
};
