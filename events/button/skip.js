module.exports = {
  name: 'skip',
  async execute({ interaction }) {
    const player = interaction.client.player;

    if (!player.queue || !player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    // if (player.currIndex + 1 > player.queue.length)
    //   return interaction.editReply({ content: `There was no more musics on queue... try again ? ❌`, ephemeral: true });

    player.emit('skip', player, player.queue[player.currIndex]);

    interaction.deleteReply();
  },
};
