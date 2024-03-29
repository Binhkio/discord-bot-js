const { endedEmbed } = require("../../src/components/embed");

module.exports = {
    name: 'stop',
    async execute(player) {        
        const embed = endedEmbed(player.queue, player.queue[player.currIndex]);
        await player.currMsg.edit({
            embeds: [embed],
            components: [],
        });

        player.isPlaying = false;
        player.queue = [];
        player.currIndex = -1;
        player.currMsg = null;

        player.stop();
    },
};
