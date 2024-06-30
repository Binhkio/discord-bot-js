const { getVoiceConnection, joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { TextBasedChannel } = require('discord.js');

/**
 * @param {TextBasedChannel} channel 
 */
async function fetchVoiceConnectionByChannel(channel) {
  const guild = channel.guild;

  const existVoiceConnection = getVoiceConnection(guild.id);
  if (existVoiceConnection)
    return existVoiceConnection;

  const initialVoiceConnection = joinVoiceChannel({
    guildId: guild.id,
    channelId: channel.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
  });

  await entersState(initialVoiceConnection, VoiceConnectionStatus.Ready, 5e3);
  console.log(`[JOIN] [Guild: ${guild.id}] [Channel: ${channel.id}]`);

  return initialVoiceConnection;
}

module.exports = {
  fetchVoiceConnectionByChannel,
}
