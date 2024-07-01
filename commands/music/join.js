const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const { createNewVoiceConnectionFromInteraction } = require("../../utils/channel");
const { textToSpeech } = require("../../utils/tts");

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
            
            const currHour = new Date(new Date().getTime() + 7*60*60*1000).getHours();
            const greet = currHour < 12 ? "sáng" : (currHour < 19 ? "chiều" : "tối");
            const fullGreeting = `Chào buổi ${greet} cả nhà`;
            textToSpeech(fullGreeting);
        }


        await interaction.editReply("I'm here bro, let's play some musics..");
    },
};