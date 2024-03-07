const { endedEmbed } = require("../../src/components/embed");

module.exports = {
  name: 'skip',
  async execute(player, currTrack, rmLastMsg) {
    if (rmLastMsg) {
      const embed = endedEmbed(player.queue, currTrack);
      player.currMsg.edit({
        embeds: [embed],
        components: [],
      });
      player.currMsg = null;
    }

    if (++player.currIndex === player.queue.length) {
      if (player.loop === 2) {
        player.currIndex = 0;
      } else if (player.loop === 0) {
        player.currIndex = -1;
        player.isPlaying = false;
        return;
      }
    }

    player.emit('start', player, player.queue[player.currIndex], true);
  },
};
