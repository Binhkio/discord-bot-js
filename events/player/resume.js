const { ActionRowBuilder } = require('discord.js');
const { back, skip, isLoop, pause, stop } = require('../../components/button');

module.exports = {
    name: 'resume',
    async execute() {
        const player = global.client.player;
        const currMsg = player.currMsg;
        const embeds = currMsg.embeds;

        const row1 = new ActionRowBuilder().addComponents(pause, skip, stop);

        player.currMsg.edit({
            embeds,
            components: [row1],
        });

        player.unpause();
    },
};
