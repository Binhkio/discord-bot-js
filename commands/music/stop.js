const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop playing music'),
  async execute(interaction) {
    const player = interaction.client.player;

    if (!player.voiceConnection) {
      return interaction.editReply({ content: `❌ No voice connection... or you are not in a voice channel`, ephemeral: true })
    }

    player.emit('stop', player);
    interaction.editReply({ content: `Stopped`, ephemeral: true })
  },
};
