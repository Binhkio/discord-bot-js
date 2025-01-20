const { ytmp3 } = require('nothing-yt');

const getStream = async (url) => {
    /**
     * Get stream by play-dl
     * https://www.npmjs.com/package/play-dl
     */
    // const { stream } = await playdl.stream(url);

    /**
     * Get stream by @distube/ytdl-core
     * https://www.npmjs.com/package/@distube/ytdl-core
     */
    // const agentOptions = {
    //     pipelining: 5,
    //     maxRedirections: 0,
    // };
    // const agent = ytdl.createAgent(cookies, agentOptions);
    // const stream = ytdl(url, {
    //     filter: 'audioonly',
    //     quality: 'highestaudio',
    //     liveBuffer: 1 << 62,
    //     highWaterMark: 1 << 62,
    //     dlChunkSize: 0,
    //     agent: agent,
    // });

    const stream = await fetch(url).then((res) => res.body);

    return stream;
};

/**
 * Getting download url of a youtube video
 * @param {string} youtubeUrl Youtube video's url
 * @returns Download url
 */
const getDownloadUrl = (youtubeUrl) => {
    /**
     * Get stream by nothing-yt
     * https://www.npmjs.com/package/nothing-yt
     */
    return ytmp3(youtubeUrl, 320).then((result) => result.download.url);
};

module.exports = {
    getStream,
    getDownloadUrl,
};
