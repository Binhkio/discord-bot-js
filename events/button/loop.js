const { ActionRowBuilder } = require('discord.js');
const {
    back,
    resume,
    pause,
    skip,
    isLoop,
    stop,
} = require('../../components/button');

module.exports = {
    name: 'loop',
    async execute({ interaction }) {
        const player = global.client.player;
        const currMsg = player.currMsg;

        const embeds = currMsg.embeds;
        player.isLoop = !player.isLoop;

        const primaryBtn = player.state.status === 'paused' ? resume : pause;
        const row1 = new ActionRowBuilder().addComponents(
            primaryBtn,
            skip,
            isLoop(player.isLoop),
            stop
        );

        currMsg.edit({
            embeds,
            components: [row1],
        });

        interaction.deleteReply();
    },
};
