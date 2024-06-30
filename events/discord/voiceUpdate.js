const { Events } = require("discord.js");
const { getPlayerByGuildId } = require("../../utils/player");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute(oldState, newState) {
        const voiceChannel = oldState.channel;
        if (!voiceChannel) return;

        const members = voiceChannel.members.size;
        if (members === 1 && voiceChannel.members.has(globalThis.client.user.id)) {
            const player = getPlayerByGuildId(oldState.guildId);

            if (player.isPlaying) {
                player.emit('stop');
            }

            const voiceConnection = getVoiceConnection(oldState.guildId);
            voiceConnection.destroy();
        }
    },
};
