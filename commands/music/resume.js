const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume player'),
  async execute(interaction) {
    const player = globalThis.client.player;

    if (!player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    player.emit('resume');

    interaction.deleteReply();
  },
};
