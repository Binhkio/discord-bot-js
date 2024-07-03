const playdl = require("play-dl");

function canAddAudio() {
    const voiceConnection = global.client.voiceConnection;
    return !!voiceConnection;
}

async function addSingleAudio(req, res) {
    try {
        if (!canAddAudio()) throw new Error("No voice connection found. Let bot join your channel first");

        const { url } = req.body;
        const type = playdl.yt_validate(url);

        if (!url || !type) throw new Error("URL was invalid");

        console.log(url);

        return res.status(200).json({
            success: true,
            message: "Add music successful",
        });
    } catch (error) {
        console.log(error, "Error from API add-single-audio");
        return res.status(200).json({
            success: true,
            message: error.message || "Add music successful",
        });
    }
}

module.exports = {
    addSingleAudio,
}