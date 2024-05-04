const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Disconnect from channel'),
  async execute(interaction) {
    const player = globalThis.client.player;

    if (!player.voiceConnection) {
      return interaction.editReply({ content: `❌ No voice connection... or you are not in a voice channel`, ephemeral: true })
    }

    player.voiceConnection.destroy();
    player.voiceConnection = null;
    if (player.isPlaying) {
      player.emit('stop');
    }
    interaction.editReply({ content: `Disconnected`, ephemeral: true })
  },
};
