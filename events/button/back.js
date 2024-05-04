const { endedEmbed } = require("../../src/components/embed");

module.exports = {
  name: 'back',
  async execute({ interaction }) {
    const player = globalThis.client.player;
    const queue = player.queue;
    const currMsg = player.currMsg;

    if (!queue || !player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    if (player.currIndex - 1 < 0)
      return interaction.editReply({ content: `There was no music played before... try again ? ❌`, ephemeral: true });

    currMsg.edit({
      embeds: [endedEmbed(queue, queue[player.currIndex])],
      components: [],
    });

    player.currIndex--;
    player.emit('start', queue[player.currIndex]);

    interaction.deleteReply();
  }
}