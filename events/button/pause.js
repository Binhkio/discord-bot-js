const { getPlayerByGuildId } = require("../../utils/player");

module.exports = {
  name: 'pause',
  async execute({ interaction }) {
    const player = getPlayerByGuildId(interaction.guildId);

    if (!player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    player.emit('pause', interaction.guildId);

    interaction.deleteReply();
  },
};
