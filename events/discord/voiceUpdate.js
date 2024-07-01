const { Events } = require("discord.js");

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute(oldState, newState) {
        const voiceChannel = oldState.channel;
        if (!voiceChannel) return;

        const members = voiceChannel.members.size;
        if (members === 1 && voiceChannel.members.has(global.client.user.id)) {
            const player = global.client.player;

            if (player.isPlaying) {
                player.emit('stop');
            }

            setTimeout(() => {
                player.voiceConnection.destroy();
            }, 1000 * 5);
        }
    },
};
