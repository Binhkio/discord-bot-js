module.exports = {
  name: 'stop',
  async execute({ interaction }) {
    const player = interaction.client.player;

    if (!player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    player.emit('stop', player);

    interaction.deleteReply();
  },
};
