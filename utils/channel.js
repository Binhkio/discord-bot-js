const { getVoiceConnection, joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { CLIENT_ID } = require('../config.json');

async function joinChannelByInteraction(interaction) {
  if (!interaction.channel || !interaction.guild) return null;

  const guild = interaction.guild;
  const channel = guild.members.cache.get(interaction.user.id)?.voice.channel;

  if (!channel) return null;
  if (channel?.members.get(CLIENT_ID)) {
    return getVoiceConnection(channel.guildId);
  }

  const initialVoiceConnection = joinVoiceChannel({
    guildId: guild.id,
    channelId: channel.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
  });

  const voiceConnection = await entersState(initialVoiceConnection, VoiceConnectionStatus.Ready, 5e3);
  console.log(`[JOIN] ${channel.id}`);

  return voiceConnection;
}

module.exports = {
  joinChannelByInteraction,
}
