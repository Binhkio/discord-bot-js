const { ActionRowBuilder } = require("discord.js");
const { playEmbed } = require("../../components/embed");
const { back, pause, skip, isLoop, stop } = require("../../components/button");
const { createAudioResource, AudioPlayerStatus, StreamType } = require("@discordjs/voice");

const playdl = require("play-dl");
const ytdl = require("ytdl-core");

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
        const stream = ytdl(player.currTrack.url, {
            filter: "audioonly",
            quality: "lowestaudio",
            liveBuffer: 0,
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
