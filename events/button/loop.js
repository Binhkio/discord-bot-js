const { ActionRowBuilder } = require("discord.js");
const { back, resume, pause, skip, loop, stop } = require("../../src/components/button");

module.exports = {
  name: 'loop',
  async execute({ interaction }) {
    const player = interaction.client.player;
    const currMsg = player.currMsg;

    const embeds = currMsg.embeds;
    player.loop = (player.loop + 1) % 3;

    const primaryBtn = player.state.status === 'paused' ? resume : pause;
    const row1 = new ActionRowBuilder().addComponents(back(player.currIndex > 0), primaryBtn, skip, loop(player.loop), stop);

    currMsg.edit({
      embeds,
      components: [row1],
    });

    interaction.deleteReply();
  },
};
