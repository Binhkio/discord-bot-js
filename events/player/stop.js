module.exports = {
    name: 'stop',
    async execute(player) {
        player.stop();
        player.isPlaying = false;
        player.queue = [];
        player.currIndex = -1;

        const currTrack = player.queue[player.currIndex];
        // player.emit('skip', currTrack, true);
    },
};
