const { ActionRowBuilder } = require("discord.js");
const { playEmbed } = require("../../src/components/embed");
const { back, pause, skip, loop, stop } = require("../../src/components/button");
const playdl = require('play-dl');
const { createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const { getPlayerByGuildId, updatePlayerStateByGuildId } = require("../../utils/player");

// Start a new track
module.exports = {
    name: 'start',
    async execute(guildId) {
        const player = getPlayerByGuildId(guildId);
        const embed = playEmbed(player.queue, player.currTrack);

        const row1 = new ActionRowBuilder().addComponents(pause, skip, loop(player.loop), stop);
        await player.channel.send({
            embeds: [embed],
            components: [row1],
        }).then(msg => player.currMsg = msg);

        const stream = await playdl.stream(player.currTrack.url);
        const resource = createAudioResource(stream.stream, {
            inputType: stream.type,
        });
        player.play(resource);

        player.once(AudioPlayerStatus.Idle, () => {
            player.emit('skip', guildId);
        });

        updatePlayerStateByGuildId(guildId);
    },
};
