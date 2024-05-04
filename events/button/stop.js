module.exports = {
  name: 'stop',
  async execute({ interaction }) {
    const player = globalThis.client.player;

    if (!player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    player.emit('stop');

    interaction.deleteReply();
  },
};
