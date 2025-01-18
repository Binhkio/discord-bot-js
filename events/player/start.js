const { ActionRowBuilder } = require('discord.js');
const { playEmbed } = require('../../components/embed');
const { back, pause, skip, isLoop, stop } = require('../../components/button');
const {
    createAudioResource,
    AudioPlayerStatus,
    StreamType,
} = require('@discordjs/voice');

const Stream = require('stream');
const playdl = require('play-dl');
const ytdl = require('@distube/ytdl-core');
const { YOUTUBE_COOKIE } = require('../../config');
const cookieParser = require('cookie-parser');

// Start a new track
module.exports = {
    name: 'start',
    async execute() {
        const player = global.client.player;
        player.isPlaying = true;

        const embed = playEmbed(player.queue, player.currTrack);
        const row1 = new ActionRowBuilder().addComponents(pause, skip, stop);

        await player.channel
            .send({
                embeds: [embed],
                components: [row1],
            })
            .then((msg) => (player.currMsg = msg));

        console.log(`=> Playing ${player.currTrack.url}`);

        /**
         * Get stream by play-dl
         */
        // const { stream } = await playdl.stream(player.currTrack.url);

        /**
         * Get stream by @distube/ytdl-core
         */
        const cookies = [
            {
                name: 'PREF',
                value: 'f6=40000000&tz=Asia.Saigon',
            },
            {
                name: 'APISID',
                value: 'sdk0qzyoqRF-7kKv/A37ui_-eUsyDiuje-',
            },
            {
                name: 'SAPISID',
                value: 'AD-hUw1Kl3CEpS1W/Al_R1ZDis2iznj5ph',
            },
            {
                name: '__Secure-1PAPISID',
                value: 'AD-hUw1Kl3CEpS1W/Al_R1ZDis2iznj5ph',
            },
            {
                name: '__Secure-3PAPISID',
                value: 'AD-hUw1Kl3CEpS1W/Al_R1ZDis2iznj5ph',
            },
            {
                name: 'SID',
                value: 'g.a000sggLNYbQKkQ4uAz7_sJmFG-TYrZ5ESuA5CYgpBOJsM33kfq9tMjZtsZdKtKTIn6rtefWdQACgYKAVwSARESFQHGX2MixuDmteY-xTWcQwOVxid6SxoVAUF8yKoMuDWeQkLqzHeq46G2Mh0Y0076',
            },
            {
                name: 'SIDCC',
                value: 'AKEyXzUWl-qAqytnH3hMpfX4Fi_wX1yE1Izj1G4jxMyBc28eSOMYr-ACxIxC-pOGkXOgWm4-',
            },
        ];
        const agentOptions = {
            pipelining: 5,
            maxRedirections: 0,
        };
        const agent = ytdl.createAgent(cookies, agentOptions);
        const stream = ytdl(player.currTrack.url, {
            filter: 'audioonly',
            quality: 'lowestaudio',
            liveBuffer: 1 << 62,
            highWaterMark: 1 << 62,
            dlChunkSize: 0,
            agent: agent,
        });

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
