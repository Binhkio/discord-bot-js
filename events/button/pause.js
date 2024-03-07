module.exports = {
  name: 'pause',
  async execute({ interaction }) {
    const player = interaction.client.player;

    if (!player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    player.emit('pause', player);

    interaction.deleteReply();
  },
};
