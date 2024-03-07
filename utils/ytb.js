const { createAudioResource } = require("@discordjs/voice");
const playdl = require('play-dl');

const handlePlay = async (url, player) => {
    if (playdl.yt_validate(url) !== "video") return;

    const stream = await this.playdl.stream(url);
    const resource = createAudioResource(stream.stream, {
        inputType: stream.type,
    });
    player.play(resource);
    return true;
}

const handleGetListUrl = async (url) => {
    const playlist = await playdl.playlist_info(url);
    const videos = await playlist.all_videos();
    return videos.map((vid) => vid.url);
}

const handleSearch = async (name) => {
    const data = await playdl.search(name, {
        limit: 10,
        source: {
            youtube: "video",
        }
    });
    return data;
}

module.exports = {
    playdl,
    handlePlay,
    handleGetListUrl,
    handleSearch,
}