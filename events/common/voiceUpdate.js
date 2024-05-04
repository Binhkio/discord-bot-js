const { Events } = require("discord.js");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute(oldState, newState) {
        const voiceChannel = oldState.channel;
        if (!voiceChannel) return;
        
        const members = voiceChannel.members.size;
        if (members === 1 && voiceChannel.members.has(globalThis.client.user.id)) {
            const player = globalThis.client.player;
            
            player.voiceConnection.destroy();
            player.voiceConnection = null;

            if (player.isPlaying) {
                player.emit('stop');
            }
        }
    },
};
