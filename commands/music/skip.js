const { SlashCommandBuilder } = require("discord.js");
const { getPlayerByGuildId } = require("../../utils/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip to next audio'),
  /**
   * 
   * @param {CommandInteraction} interaction 
   * @returns 
   */
  async execute(interaction) {
    const player = getPlayerByGuildId(interaction.guildId);

    if (!player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    player.emit('skip');

    interaction.deleteReply();
  },
};
