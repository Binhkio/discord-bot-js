const { getPlayerByGuildId } = require("../../utils/player");

module.exports = {
  name: 'skip',
  async execute({ interaction }) {
    const player = getPlayerByGuildId(interaction.guildId);

    if (!player.queue || !player.isPlaying)
      return interaction.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    // if (player.currIndex + 1 > player.queue.length)
    //   return interaction.editReply({ content: `There was no more musics on queue... try again ? ❌`, ephemeral: true });

    player.emit('skip', interaction.guildId);

    interaction.deleteReply();
  },
};
