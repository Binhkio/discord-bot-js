const { SlashCommandBuilder } = require("discord.js");

const playdl = require('play-dl');
const { addEmbed, multiAddEmbed } = require("../../src/components/embed");
const { joinChannelByInteraction } = require("../../utils/channel");

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

        if (!player.voiceConnection) {
            const newVoiceConnection = await joinChannelByInteraction(interaction);
            if (!newVoiceConnection) return interaction.editReply({ content: `❌ No voice connection... try again ?`, ephemeral: true });

            newVoiceConnection.subscribe(player);
            player.voiceConnection = newVoiceConnection;
            
            player.queue = [];
            player.isPlaying = false;
            player.loop = 2; // 0-Disabled | 1-Track | 2-Queue
            player.currIndex = -1;
            player.currMsg = null;
        }

        if (type === 'video' || (type === 'playlist' && !isPlaylist && url.includes('watch'))) {
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

        // Play new audio if player is not playing
        if (!player.isPlaying) {
            player.isPlaying = true;
            player.currIndex = 0;
            player.channel = interaction.channel;

            player.emit('start', player, player.queue[0]);
        } else {
            // Do nothing
        }
    },
};