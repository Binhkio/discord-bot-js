const { ActionRowBuilder } = require("discord.js");
const { back, skip, loop, pause, stop } = require("../../src/components/button");

module.exports = {
  name: 'resume',
  async execute() {
    const player = globalThis.client.player;
    const currMsg = player.currMsg;
    const embeds = currMsg.embeds;

    const row1 = new ActionRowBuilder().addComponents(back(player.currIndex > 0), pause, skip, loop(player.loop), stop);

    player.currMsg.edit({
      embeds,
      components: [row1],
    });

    player.unpause();
  },
};
