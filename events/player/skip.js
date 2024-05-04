const { endedEmbed } = require("../../src/components/embed");

module.exports = {
  name: 'skip',
  async execute(currTrack) {
    const player = globalThis.client.player;
    const embed = endedEmbed(player.queue, currTrack);
    await player.currMsg.edit({
      embeds: [embed],
      components: [],
    });
    player.currMsg = null;
    
    player.currIndex += 1;
    if (player.currIndex === player.queue.length) {
      if (player.loop === 2) {
        player.currIndex = 0;
      } else if (player.loop === 0) {
        player.emit('stop');
        return;
      }
    }

    player.emit('start', player.queue[player.currIndex]);
  },
};
