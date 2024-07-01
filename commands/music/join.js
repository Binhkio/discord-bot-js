const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const { createNewVoiceConnectionFromInteraction } = require("../../utils/channel");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join your voice channel'),
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

        await interaction.editReply("I'm here bro, let's play some musics..");
    },
};