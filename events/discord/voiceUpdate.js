const { Events } = require("discord.js");

const { getVoiceConnection } = require("@discordjs/voice");
const { textToSpeech } = require("../../utils/tts");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState, newState) {
        const oldChannel = oldState?.channel;
        const newChannel = newState?.channel;

        if (!oldChannel?.members?.has(global.client.user.id) && newChannel?.members?.has(global.client.user.id)) {
            // Someone join the channel where bot is staying in
            const currHour = new Date().getHours();
            const greet = currHour < 12 ? "sáng" : (currHour < 19 ? "chiều" : "tối");
            const fullGreeting = `Chào buổi ${greet}, ${newState.member.nickname || newState.member.user.globalName}`;
            await textToSpeech(fullGreeting);
        }
        if (oldChannel?.members?.has(global.client.user.id) && !newChannel?.members?.has(global.client.user.id)) {
            const fullGoodbye = `Tạm biệt ${newState.member.nickname || newState.member.user.globalName}`;
            await textToSpeech(fullGoodbye);
        }

        if (oldChannel && !newChannel) {
            const members = oldChannel.members.size;
            if (members === 1 && oldChannel.members.has(global.client.user.id)) {
                const player = global.client.player;
    
                if (player.isPlaying) {
                    player.emit('stop');
                }
    
                setTimeout(() => {
                    player.voiceConnection.destroy();
                }, 1000 * 5);
            }
        }

    },
};
