const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip to next audio'),
  async execute(interaction) {
    const player = interaction.client.player;

    if (!player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    player.emit('skip', player);

    interaction.deleteReply();
  },
};
