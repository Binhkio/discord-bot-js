const {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const { CommandInteraction } = require("discord.js");

/**
 * @param {CommandInteraction} interaction
 */
async function createNewVoiceConnectionFromInteraction(interaction) {
  const guild = interaction.guild;
  const channel = interaction.member.voice.channel;

  const initialVoiceConnection = joinVoiceChannel({
    guildId: guild.id,
    channelId: channel.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
  });

  const voiceConnection = await entersState(
    initialVoiceConnection,
    VoiceConnectionStatus.Ready,
    5e3,
  );
  console.log(`[NEW_CONNECT] [Guild: ${guild.id}] [Channel: ${channel.id}]`);

  return voiceConnection;
}

module.exports = {
  createNewVoiceConnectionFromInteraction,
};
