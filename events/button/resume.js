const { getPlayerByGuildId } = require("../../utils/player");

module.exports = {
  name: 'resume',
  async execute({ interaction }) {
    const player = getPlayerByGuildId(interaction.guildId);

    if (!player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    player.emit('resume', interaction.guildId);

    interaction.deleteReply();
  },
};
