const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const { addEmbed, multiAddEmbed } = require("../../components/embed");
const { createNewVoiceConnectionFromInteraction } = require("../../utils/channel");
const playdl = require('play-dl');

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
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const player = global.client.player;

        if (!player.voiceConnection) {
            const newVoiceConnection = await createNewVoiceConnectionFromInteraction(interaction);
            player.subscription = newVoiceConnection.subscribe(player);
            player.voiceConnection = newVoiceConnection;
        }

        const url = interaction.options.getString('url');
        const isPlaylist = interaction.options.getBoolean('playlist') || false;

        const type = playdl.yt_validate(url);
        if (!type || !url.startsWith('https')) {
            // Can use search
            await interaction.editReply(`Invalid URL. Please try again!`);
            return;
        }
        else if (type === 'video' || (type === 'playlist' && !isPlaylist && url.includes('watch'))) {
            const valid_url = url.split('&')[0];

            const info = await playdl.video_info(valid_url);
            const track = info.video_details;
            track.user = interaction.user;

            // Add track to queue
            player.queue.push(track);

            const embed = addEmbed(player.queue, track);
            await interaction.editReply({
                embeds: [embed],
            });
        }
        else if ((type === 'playlist' && isPlaylist) || url.includes('playlist')) {
            const info = await playdl.playlist_info(url);
            const tracks = await info.all_videos();

            tracks.forEach(track => {
                track.user = interaction.user;
                // Add tracks to queue
                player.queue.push(track);
            })

            const embed = multiAddEmbed(player.queue, info, tracks);
            await interaction.editReply({
                embeds: [embed],
            });
        }

        // Save
        player.channel = interaction.channel;

        // Play new audio if player is not playing
        if (!player.isPlaying) {
            player.emit('skip');
        } else {

        }
    },
};