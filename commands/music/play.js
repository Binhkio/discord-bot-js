const { SlashCommandBuilder } = require("discord.js");

const playdl = require('play-dl');
const { addEmbed } = require("../../src/components/embed");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play Youtube music!')
        .addStringOption(option => option
            .setName('url')
            .setDescription('URL of Youtube video or playlist')
            .setRequired(true))
        .addBooleanOption(option => option
            .setName('playlist')
            .setDescription('Type true if it is a playlist\'s url else type false')),
    async execute(interaction) {
        const url = interaction.options.getString('url');
        const isPlaylist = interaction.options.getBoolean('playlist') || false;
        const player = interaction.client.player;
        const type = playdl.yt_validate(url);
        
        if (type === 'video' || (type === 'playlist' && !isPlaylist && url.includes('watch'))) {
            const valid_url = url.split('&')[0];
            console.log(`[PLAY] ${valid_url}`);

            const info = await playdl.video_info(valid_url);
            const track = info.video_details;
            track.user = interaction.user;

            // Add track to queue
            player.queue.push(track);

            const embed = addEmbed(player.queue, track);
            await interaction.editReply({
                embeds: [embed],
            });

            // Play new audio if player is not playing
            if (!player.isPlaying) {
                player.isPlaying = true;
                player.channel = interaction.channel;

                player.emit('start', player.queue, track);
            }
        } else {
            interaction.editReply("OK");
        }

    },
};