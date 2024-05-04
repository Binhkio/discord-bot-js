const { ActionRowBuilder } = require("discord.js");
const { playEmbed } = require("../../src/components/embed");
const { back, pause, skip, loop, stop } = require("../../src/components/button");
const playdl = require('play-dl');
const { createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");

// Start a new track
module.exports = {
    name: 'start',
    async execute(track) {
        const player = globalThis.client.player;
        const embed = playEmbed(player.queue, track, player.currIndex);

        const row1 = new ActionRowBuilder().addComponents(back(player.currIndex > 0), pause, skip, loop(player.loop), stop);
        player.channel.send({
            embeds: [embed],
            components: [row1],
        }).then(msg => player.currMsg = msg);

        const stream = await playdl.stream(track.url);
        const resource = createAudioResource(stream.stream, {
            inputType: stream.type,
        });
        player.play(resource);

        player.once(AudioPlayerStatus.Idle, () => {
            if (!player.isPlaying) return;

            if (player.loop === 1) {
                player.currIndex -= 1;
            }
            
            player.emit('skip', track);
        });
    },
};
