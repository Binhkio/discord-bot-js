const { ActionRowBuilder } = require("discord.js");
const { back, resume, pause, skip, loop, stop } = require("../../src/components/button");
const { getPlayerByGuildId, updatePlayerStateByGuildId } = require("../../utils/player");

module.exports = {
  name: 'loop',
  async execute({ interaction }) {
    const player = getPlayerByGuildId(interaction.guildId);
    const currMsg = player.currMsg;

    const embeds = currMsg.embeds;
    player.loop = !player.loop;

    const primaryBtn = player.state.status === 'paused' ? resume : pause;
    const row1 = new ActionRowBuilder().addComponents(primaryBtn, skip, loop(player.loop), stop);

    currMsg.edit({
      embeds,
      components: [row1],
    });

    updatePlayerStateByGuildId(interaction.guildId);

    interaction.deleteReply();
  },
};
