const {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const { default: axios } = require("axios");
const { Readable } = require("stream");
const { getAudioUrl, getAllAudioUrls } = require("google-tts-api");

/**
 *
 * @param {string} message
 */
async function textToSpeech(message) {
  let voiceData;

  if (message.length < 200) {
    const voiceURL = getAudioUrl(message, {
      lang: "vi",
      slow: false,
      host: "https://translate.google.com",
    });

    const { data } = await axios.get(voiceURL, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });

    voiceData = data;
  } else {
    const voiceURLs = getAllAudioUrls(message, {
      lang: "vi",
      slow: false,
      host: "https://translate.google.com",
    });

    const data = await Promise.all(
      voiceURLs.map(async (val) => {
        const { data } = await axios.get(val.url, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "audio/mpeg",
          },
        });
        return Promise.resolve(data);
      }),
    );

    voiceData = data;
  }

  const ttsPlayer = createAudioPlayer();
  const streamData = Readable.from(voiceData);
  const resource = createAudioResource(streamData);
  ttsPlayer.play(resource);

  if (global.client.player.subscription) {
    global.client.player.subscription.unsubscribe();
  }

  if (global.client.player.voiceConnection) {
    const newSubcription =
      global.client.player.voiceConnection.subscribe(ttsPlayer);
    ttsPlayer.once(AudioPlayerStatus.Idle, () => {
      if (newSubcription) {
        newSubcription.unsubscribe();

        if (global.client.player) {
          global.client.player.subscription =
            global.client.player.voiceConnection.subscribe(
              global.client.player,
            );
        }
      }
    });
  }
}

module.exports = {
  textToSpeech,
};
