const { getVoiceConnection } = require("@discordjs/voice");
const { endedEmbed } = require("../../components/embed");

module.exports = {
    name: 'stop',
    async execute() {
        const player = global.client.player;
        
        if (player?.currMsg) {
            const embed = endedEmbed(player.currTrack);
            await player.currMsg.edit({
                embeds: [embed],
                components: [],
            });
        }

        player.isPlaying = false;
        player.queue = [];
        player.currMsg = null;

        player.stop();
    },
};
