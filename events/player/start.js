const { ActionRowBuilder } = require('discord.js');
const { playEmbed, waitEmbed } = require('../../components/embed');
const { back, pause, skip, isLoop, stop } = require('../../components/button');
const {
    createAudioResource,
    AudioPlayerStatus,
    StreamType,
} = require('@discordjs/voice');

const { getDownloadUrl, getStream } = require('../../utils/stream');

// Start a new track
module.exports = {
    name: 'start',
    async execute() {
        const player = global.client.player;
        player.isPlaying = true;

        const wE = waitEmbed();
        const pE = playEmbed(player.queue, player.currTrack);
        const row1 = new ActionRowBuilder().addComponents(pause, skip, stop);

        // Display wait embed
        await player.channel
            .send({
                embeds: [wE],
                components: [],
            })
            .then((msg) => (player.currMsg = msg));

        console.log(
            `=> Playing ${player.currTrack.url || player.currTrack.video_url}`
        );

        // Check if download url is existed
        if (
            !player.downloadUrls[
                player.currTrack.id || player.currTrack.videoId
            ]
        ) {
            const dlUrl = await getDownloadUrl(
                player.currTrack.url || player.currTrack.video_url
            );
            player.downloadUrls[
                player.currTrack.id || player.currTrack.videoId
            ] = dlUrl;
        }

        // Display play embed
        await player.currMsg.edit({
            embeds: [pE],
            components: [row1],
        });

        console.log(
            `CURRENT_TRACK: ${
                player.currTrack.id || player.currTrack.videoId
            } - ${
                player.downloadUrls[
                    player.currTrack.id || player.currTrack.videoId
                ]
            }`
        );

        const stream = await getStream(
            player.downloadUrls[player.currTrack.id || player.currTrack.videoId]
        );

        if (!stream) throw new Error('No stream found');
        const resource = createAudioResource(stream, {});
        player.play(resource);

        player.once(AudioPlayerStatus.Idle, () => {
            if (player.isPlaying) {
                player.emit('skip');
            }

            player.isPlaying = false;
        });
    },
};
