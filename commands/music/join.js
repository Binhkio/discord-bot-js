const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const { fetchVoiceConnectionByChannel } = require("../../utils/channel");
const { getPlayerByGuildId } = require("../../utils/player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join your voice channel'),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const guildId = interaction.guildId;
        const voiceConnection = await fetchVoiceConnectionByChannel(interaction);
        const player = getPlayerByGuildId(guildId);
        voiceConnection.subscribe(player);

        await interaction.editReply("I'm here bro, let's play some musics..");
    },
};