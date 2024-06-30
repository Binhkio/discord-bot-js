const { getPlayerByGuildId } = require("../../utils/player");

module.exports = {
  name: 'stop',
  async execute({ interaction }) {
    const player = getPlayerByGuildId(interaction.guildId);

    if (!player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    player.emit('stop', interaction.guildId);

    interaction.deleteReply();
  },
};
