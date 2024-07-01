const { createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const { default: axios } = require("axios");
const { Readable } = require("stream");
const { getAudioUrl } = require("google-tts-api");

async function textToSpeech(message) {
    const voiceURL = getAudioUrl(message, {
        lang: 'vi',
        slow: false,
        host: 'https://translate.google.com',
    });

    const { data } = await axios.get(voiceURL, {
        responseType: 'arraybuffer',
        headers: {
            "Content-Type": 'audio/mpeg'
        }
    })

    const ttsPlayer = createAudioPlayer();
    const streamData = Readable.from(data);
    const resource = createAudioResource(streamData);
    ttsPlayer.play(resource);
    
    if (global.client.player.subscription) {
        global.client.player.subscription.unsubscribe();
    }

    if (global.client.player.voiceConnection) {
        const newSubcription = global.client.player.voiceConnection.subscribe(ttsPlayer);
        ttsPlayer.once(AudioPlayerStatus.Idle, () => {
            if (newSubcription) {
                newSubcription.unsubscribe();
                
                if (global.client.player) {
                    global.client.player.subscription = global.client.player.voiceConnection.subscribe(global.client.player);
                }
            }
        });
    }
}

module.exports = {
    textToSpeech,
}