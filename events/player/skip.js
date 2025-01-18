const { endedEmbed } = require('../../components/embed');

module.exports = {
    name: 'skip',
    async execute() {
        const player = global.client.player;

        if (player?.currMsg) {
            const embed = endedEmbed(player.currTrack);
            await player.currMsg.edit({
                embeds: [embed],
                components: [],
            });
        }
        player.currMsg = null;

        if (!player.isLoop) {
            // Queue is not loop
            if (player.queue.length > 0) {
                // Queue is not clear
                player.currTrack = player.queue.shift();
                player.emit('start');
            } else {
                // Queue is clear
                player.emit('stop');
            }
        } else {
            // Queue is loop
            player.currTrack = player.queue.shift();
            player.emit('start');
        }
    },
};
