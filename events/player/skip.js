const { endedEmbed } = require("../../src/components/embed");
const { getPlayerByGuildId, updatePlayerStateByGuildId } = require("../../utils/player");

module.exports = {
  name: 'skip',
  async execute(guildId) {
    const player = getPlayerByGuildId(guildId);
    const embed = endedEmbed(player.currTrack);

    await player?.currMsg?.edit({
      embeds: [embed],
      components: [],
    });
    player.currMsg = null;

    // Queue is not clear
    if (player.queue.length > 0) {
      if (!player.loop) {
        player.currTrack = player.queue.shift();
      }
      updatePlayerStateByGuildId(guildId);
      player.emit('start', guildId);
    }

  },
};
