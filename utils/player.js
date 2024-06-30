const { createAudioPlayer, NoSubscriberBehavior, AudioPlayer } = require("@discordjs/voice");
const fs = require("node:fs");
const path = require("node:path");

function generatePlayer() {
  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });

  const playerPath = path.join(__dirname, '..', 'events', 'player')
  const playerEventFiles = fs.readdirSync(playerPath).filter(file => file.endsWith('.js'));
  for (const file of playerEventFiles) {
    const eventPath = path.join(playerPath, file)
    const event = require(eventPath);

    player.addListener(event.name, (...args) => {
      event.execute(...args);
    });
  }

  // Initialize prototype for player
  player.queue = [];  // Array of Tracks
  player.prevQueue = [];
  player.isPlaying = false;
  player.loop = false;

  console.log(`[PLAYER] Generate new!`);
  return player;
}

/**
 * 
 * @param {string} guildId The guild id
 * @returns Player
 */
function getPlayerByGuildId(guildId) {
  const player = global.guildPlayer[guildId];
  if (player)
    return player;

  const newPlayer = generatePlayer();
  newPlayer.guildId = guildId;
  global.guildPlayer[guildId] = newPlayer;
  return newPlayer;
}

/**
 * 
 * @param {string} guildId 
 * @param {AudioPlayer} player 
 */
function updatePlayerStateByGuildId(guildId, player) {
  global.guildPlayer[guildId] = player;
}

module.exports = {
  getPlayerByGuildId,
  updatePlayerStateByGuildId,
}