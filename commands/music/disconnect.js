const { getVoiceConnection, AudioPlayerStatus } = require("@discordjs/voice");
const { SlashCommandBuilder, CommandInteraction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Disconnect from channel"),
  /**
   *
   * @param {CommandInteraction} interaction
   * @returns
   */
  async execute(interaction) {
    const voiceConnection = getVoiceConnection(interaction.guildId);
    const player = global.client.player;

    if (!voiceConnection) {
      await interaction.editReply({
        content: `❌ No voice connection... or you are not in a voice channel`,
        ephemeral: true,
      });
      return;
    }

    voiceConnection.destroy();

    await interaction.editReply({ content: `Disconnected`, ephemeral: true });
  },
};
