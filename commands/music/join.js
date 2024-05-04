const { SlashCommandBuilder } = require("discord.js");
const { joinChannelByInteraction } = require("../../utils/channel");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join your voice channel'),
    async execute(interaction) {
        const player = globalThis.client.player;

        if (!player.voiceConnection) {
            const newVoiceConnection = await joinChannelByInteraction(interaction);
            if (!newVoiceConnection) return interaction.editReply({ content: `❌ No voice connection... try again ?`, ephemeral: true });

            newVoiceConnection.subscribe(player);
            player.voiceConnection = newVoiceConnection;
            
            player.queue = [];
            await interaction.editReply(`Joined`);
        } else {
            await interaction.editReply(`Already joined...`);
        }
    },
};