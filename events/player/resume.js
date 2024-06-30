const { ActionRowBuilder } = require("discord.js");
const { back, skip, loop, pause, stop } = require("../../src/components/button");
const { getPlayerByGuildId, updatePlayerStateByGuildId } = require("../../utils/player");

module.exports = {
  name: 'resume',
  async execute(guildId) {
    const player = getPlayerByGuildId(guildId);
    const currMsg = player.currMsg;
    const embeds = currMsg.embeds;

    const row1 = new ActionRowBuilder().addComponents(pause, skip, loop(player.loop), stop);

    player.currMsg.edit({
      embeds,
      components: [row1],
    });

    player.unpause();

    updatePlayerStateByGuildId(guildId);
  },
};
