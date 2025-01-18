const { ActionRowBuilder } = require('discord.js');
const { back, resume, skip, isLoop, stop } = require('../../components/button');

module.exports = {
    name: 'pause',
    async execute() {
        const player = global.client.player;
        const currMsg = player.currMsg;
        const embeds = currMsg.embeds;

        const row1 = new ActionRowBuilder().addComponents(resume, skip, stop);

        player.currMsg.edit({
            embeds,
            components: [row1],
        });

        player.pause();
    },
};
