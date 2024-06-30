const { ActionRowBuilder } = require("discord.js");
const { back, resume, skip, loop, stop } = require("../../src/components/button");
const { getPlayerByGuildId, updatePlayerStateByGuildId } = require("../../utils/player");

module.exports = {
  name: 'pause',
  async execute(guildId) {
    const player = getPlayerByGuildId(guildId);
    const currMsg = player.currMsg;
    const embeds = currMsg.embeds;

    const row1 = new ActionRowBuilder().addComponents(resume, skip, loop(player.loop), stop);

    player.currMsg.edit({
      embeds,
      components: [row1],
    });

    player.pause();

    updatePlayerStateByGuildId(guildId);
  },
};
