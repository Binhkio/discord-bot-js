const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const {
  createNewVoiceConnectionFromInteraction,
} = require("../../utils/channel");
const { textToSpeech } = require("../../utils/tts");
const { createListeningStream } = require("../../utils/stt");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("record")
    .setDescription("Record anything you said"),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const player = global.client.player;
    player.channel = interaction.channel;

    if (!player.voiceConnection) {
      const newVoiceConnection =
        await createNewVoiceConnectionFromInteraction(interaction);
      player.subscription = newVoiceConnection.subscribe(player);
      player.voiceConnection = newVoiceConnection;

      const currHour = new Date(
        new Date().getTime() + 7 * 60 * 60 * 1000,
      ).getHours();
      const greet = currHour < 12 ? "sáng" : currHour < 19 ? "chiều" : "tối";
      const fullGreeting = `Chào buổi ${greet} cả nhà`;
      textToSpeech(fullGreeting);
    }

    const legitUsers = interaction.member.voice.channel.members.filter(
      (member) => !member.user.bot,
    );

    legitUsers.map(({ user }) => {
      player.voiceConnection.receiver.speaking.once("start", (userId) => {
        createListeningStream(player.voiceConnection.receiver, userId, user);
      });
    });

    await interaction.editReply("Recording...");
  },
};
