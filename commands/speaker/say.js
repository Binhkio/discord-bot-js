const { SlashCommandBuilder, CommandInteraction, userMention } = require("discord.js");
const { createNewVoiceConnectionFromInteraction } = require("../../utils/channel");
const { textToSpeech } = require("../../utils/tts");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say something..')
        .addStringOption(option => option
            .setName('content')
            .setDescription('What you want to say?')
            .setRequired(true)),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const player = global.client.player;
        player.channel = interaction.channel;

        if (!player.voiceConnection) {
            const newVoiceConnection = await createNewVoiceConnectionFromInteraction(interaction);
            player.subscription = newVoiceConnection.subscribe(player);
            player.voiceConnection = newVoiceConnection;
            
            const currHour = new Date(new Date().getTime() + 7*60*60*1000).getHours();
            const greet = currHour < 12 ? "sáng" : (currHour < 19 ? "chiều" : "tối");
            const fullGreeting = `Chào buổi ${greet} cả nhà`;
            textToSpeech(fullGreeting);
        }

        const content = interaction.options.getString('content');

        if (!content) await interaction.editReply("Nothing to say");

        textToSpeech(content);

        await interaction.editReply(`${userMention(interaction.user.id)}\n${content}`);
    },
};