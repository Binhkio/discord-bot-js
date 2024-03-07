const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('disconnect')
    .setDescription('Disconnect from channel'),
  async execute(interaction) {
    const player = interaction.client.player;

    if (!player.voiceConnection) {
      return interaction.editReply({ content: `❌ No voice connection... or you are not in a voice channel`, ephemeral: true })
    }

    player.voiceConnection.destroy();
    interaction.editReply({ content: `Disconnected`, ephemeral: true })
  },
};
