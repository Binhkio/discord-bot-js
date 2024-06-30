const { endedEmbed } = require("../../src/components/embed");
const { getPlayerByGuildId, updatePlayerStateByGuildId } = require("../../utils/player");

module.exports = {
    name: 'stop',
    async execute(guildId) {
        const player = getPlayerByGuildId(guildId);
        const embed = endedEmbed(player.currTrack);

        await player?.currMsg?.edit({
            embeds: [embed],
            components: [],
        });

        player.isPlaying = false;
        player.queue = [];
        player.currMsg = null;

        player.stop();
        updatePlayerStateByGuildId(guildId);
    },
};
