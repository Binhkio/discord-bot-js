const { ActionRowBuilder } = require("discord.js");
const { playEmbed } = require("../../components/embed");
const { back, pause, skip, isLoop, stop } = require("../../components/button");
const { createAudioResource, AudioPlayerStatus, StreamType } = require("@discordjs/voice");

const Stream = require("stream");
const playdl = require("play-dl");
const ytdl = require("@distube/ytdl-core");
const { YOUTUBE_COOKIE } = require("../../config");

// Start a new track
module.exports = {
    name: 'start',
    async execute() {
        const player = global.client.player;
        player.isPlaying = true;
        
        const embed = playEmbed(player.queue, player.currTrack);
        const row1 = new ActionRowBuilder().addComponents(pause, skip, stop);

        await player.channel.send({
            embeds: [embed],
            components: [row1],
        }).then(msg => player.currMsg = msg);

        console.log(`=> Playing ${player.currTrack.url}`);

        // const { stream } = await playdl.stream(player.currTrack.url);
        
        const cookies = [
            { name: "APISID", value: "UOoV3ilDAuBX7OCk/AH5qRfPMPdOaNMKpk" },
            { name: "SAPISID", value: "lDez0GpmtNX8_EA8/AsxZttLN9MJRt0mkj" },
            { name: "__Secure-1PAPISID", value: "lDez0GpmtNX8_EA8/AsxZttLN9MJRt0mkj" },
            { name: "__Secure-3PAPISID", value: "lDez0GpmtNX8_EA8/AsxZttLN9MJRt0mkj" },
            { name: "PREF", value: "f6=40000000&f7=4150&tz=Asia.Saigon" },
            { name: "SID", value: "g.a000lQgSMUbtnA9b7GJ8LYUlBnv10ZdwadTMrKiLElxnNnJC-rLqRPbcuX8MFwyUJHonQRZ40QACgYKAQsSARcSFQHGX2MiLWXFreSySZ09Ix1t-RVzKBoVAUF8yKpZ5y06-i3mQMdgzleWOxXB0076; ST-sbra4i=session_logininfo=AFmmF2swRQIgdYgoYvZ6gxRyVuy9H8Zg1FLmoXpD04hOONZIwLO42IUCIQCO6xveYG5ZCQEQoA1IWFRhNemMGBBdtvni27COhKUbhQ%3AQUQ3MjNmd3dtamppMGxuQWJ4bFM3S1RSMFQwY21mSF9Zc3RKU2FXc1ZlLWp2RjA2ME9DcU1OUXpmdmszQXo3ckxTZ0dJQ3NiT3ZSa0h5alYxZ0FwWmN3Zk5XV2MzUG9XUDV0b0d1Z3dUaW02NHBpeTZsRm9PNU92THpyaS00Tm91ZkJxNFF6ZG1tLW0ybmxyUHVyN3czbTVCZXpiN3dWXzVn; ST-183jmdn=session_logininfo=AFmmF2swRQIgdYgoYvZ6gxRyVuy9H8Zg1FLmoXpD04hOONZIwLO42IUCIQCO6xveYG5ZCQEQoA1IWFRhNemMGBBdtvni27COhKUbhQ%3AQUQ3MjNmd3dtamppMGxuQWJ4bFM3S1RSMFQwY21mSF9Zc3RKU2FXc1ZlLWp2RjA2ME9DcU1OUXpmdmszQXo3ckxTZ0dJQ3NiT3ZSa0h5alYxZ0FwWmN3Zk5XV2MzUG9XUDV0b0d1Z3dUaW02NHBpeTZsRm9PNU92THpyaS00Tm91ZkJxNFF6ZG1tLW0ybmxyUHVyN3czbTVCZXpiN3dWXzVn" },
            { name: "SIDCC", value: "AKEyXzUCmgeQspm8CJI3CMLAB40Ewl7TwO6dDPtnOq3IBpa2kW4z8zvlDHg6L6zu_x6Kc10Ta54" },
        ];
        const agentOptions = {
            pipelining: 5,
            maxRedirections: 0,
        }
        const agent = ytdl.createAgent(cookies, agentOptions);
        const stream = ytdl(player.currTrack.url, {
            filter: "audioonly",
            quality: "lowestaudio",
            liveBuffer: 1 << 62,
            highWaterMark: 1 << 62,
            dlChunkSize: 0,
            agent: agent,
        });

        if (!stream) throw new Error("No stream found");
        const resource = createAudioResource(stream, {

        });
        player.play(resource);

        player.once(AudioPlayerStatus.Idle, () => {
            if (player.isPlaying) {
                player.emit('skip');
            }
            
            player.isPlaying = false;
        });

    },
};
