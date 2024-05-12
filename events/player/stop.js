const { endedEmbed } = require("../../src/components/embed");

module.exports = {
    name: 'stop',
    async execute() {
        const player = globalThis.client.player;
        const embed = endedEmbed(player.queue, player.queue[player.currIndex]);
        await player.currMsg.edit({
            embeds: [embed],
            components: [],
        });

        player.isPlaying = false;
        player.queue = [];
        player.currIndex = -1;
        player.currMsg = null;

        globalThis.client.player = player;

        player.stop();
    },
};
