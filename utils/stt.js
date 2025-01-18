const { User } = require("discord.js");

const { AssemblyAI } = require("assemblyai");
const { VoiceReceiver, EndBehaviorType } = require("@discordjs/voice");
const { OpusEncoder } = require("@discordjs/opus");
const fs = require("node:fs");
const ffmpeg = require("fluent-ffmpeg");

const sttClient = new AssemblyAI({
  apiKey: "52939a539e6c4707acc58b079bef20a0",
});

/**
 *
 * @param {VoiceReceiver} receiver
 * @param {string} userId
 * @param {User} user
 */
const createListeningStream = async (receiver, userId, user) => {
  if (user.bot) return;

  const opusStream = receiver.subscribe(userId, {
    end: {
      behavior: EndBehaviorType.AfterSilence,
      duration: 1000,
    },
  });

  const encoder = new OpusEncoder(48000, 2);

  const defaultPath = `data/records/tmp`;
  const filePath = `${defaultPath}/audio_${userId}.mp3`;
  // const fileStream = fs.createWriteStream(filePath);

  ffmpeg(opusStream)
    .audioCodec("libmp3lame")
    .toFormat("mp3")
    .save(filePath)
    .on("end", () => {
      logTranscript(user.globalName, filePath);
    });

  // opusStream.on("end", () => {
  //     logTranscript(user.globalName, filePath);
  // });
};

/**
 *
 * @param {string} userName
 * @param {string} audioPath
 */
const logTranscript = async (userName, audioPath) => {
  const transcript = await sttClient.transcripts.transcribe({
    audio: audioPath,
    language_code: "vi",
  });

  const defaultPath = `data/records`;
  const today = new Date().toISOString().split("T")[0];
  const filePath = `${defaultPath}/${today}.txt`;

  const currTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  const newData = `\t[${currTime}] @${userName}\n${transcript.text}\n`;

  try {
    if (!fs.existsSync(defaultPath)) {
      fs.mkdirSync(defaultPath);
    }
    fs.appendFileSync(filePath, newData);
    console.log("Wrote file");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createListeningStream,
};
