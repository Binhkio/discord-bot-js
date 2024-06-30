const { getVoiceConnection } = require("@discordjs/voice");
const { SlashCommandBuilder } = require("discord.js");
const { getPlayerByGuildId } = require("../../utils/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Disconnect from channel'),
  /**
   * 
   * @param {CommandInteraction} interaction 
   * @returns 
   */
  async execute(interaction) {
    const voiceConnection = getVoiceConnection(interaction.guildId);
    const player = getPlayerByGuildId(interaction.guildId);

    if (!voiceConnection) {
      await interaction.editReply({ content: `❌ No voice connection... or you are not in a voice channel`, ephemeral: true });
      return;
    }

    voiceConnection.destroy();
    if (player.isPlaying) {
      player.emit('stop');
    }
    interaction.editReply({ content: `Disconnected`, ephemeral: true })
  },
};
