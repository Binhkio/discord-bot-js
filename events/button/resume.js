module.exports = {
  name: "resume",
  async execute({ interaction }) {
    const player = global.client.player;

    if (!player.isPlaying)
      return interaction.editReply({
        content: `No music currently playing... try again ? ❌`,
        ephemeral: true,
      });

    player.emit("resume");

    interaction.deleteReply();
  },
};
