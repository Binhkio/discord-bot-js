const { EmbedBuilder } = require("discord.js")

const playEmbed = (queue, track) => new EmbedBuilder()
    .setAuthor({
        name: "🔥 ĐANG PHÁT 🔥",
        iconURL: track.user.avatarURL({ extension:'png' }) || undefined,
    })
    .setTitle('🎶🎶 ' + track.title 
        ? (track.title.length > 255 ? track.title?.slice(0,250).concat("...") : track.title)
        : "")
    .setColor('Blue')
    .setImage(track.thumbnails[0].url)
    .setURL(track.url)
    .addFields({ name: '🏷️ Nguồn', value: `\`${track.channel?.name}\``, inline: true })
    .addFields({ name: '📢 Người thêm', value: `\`${track.user.username}\``, inline: true })
    .addFields({ name: '🕖 Thời lượng', value: `\`${track.durationRaw}\``, inline: true })
    .addFields({ name: 'Queue', value: `\`${queue.length}\``, inline: true })
    .setTimestamp()
    .setFooter({text: "_Developed by Binhkio_"})

const endedEmbed = (track) => new EmbedBuilder()
    .setAuthor({
        name: "🔥 ĐÃ PHÁT 🔥",
        iconURL: user.avatarURL({ extension:'png' }) || undefined,
    })
    .setTitle(title)
    .setURL(video.url)
    .setColor('Blue')
    .setTimestamp()
    .setFooter({text: `_Developed by Binhkio_`})

const addEmbed = (queue, track) => new EmbedBuilder()
    .setAuthor({
        name: "✅ THÊM NHẠC",
        iconURL: track.user.avatarURL({ extension:"png" }) || undefined,
    })
    .setTitle('🎶🎶 ' + track.title 
    ? (track.title.length > 255 ? track.title?.slice(0,250).concat("...") : track.title)
    : "")
    .setColor('Green')
    .setURL(track.url)
    .addFields({ name: '🏷️ Nguồn', value: `\`${track.channel?.name}\``, inline: true })
    .addFields({ name: '📢 Người thêm', value: `\`${track.user.username}\``, inline: true })
    .addFields({ name: '🕖 Thời lượng', value: `\`${track.durationRaw}\``, inline: true })
    .addFields({ name: 'Queue', value: `\`${queue.length}\``, inline: true })
    .setTimestamp()
    .setFooter({text: `_Developed by Binhkio_`})

const multiAddEmbed = (tracks) => new EmbedBuilder()
    .setAuthor({
        name: "✅ THÊM DANH SÁCH NHẠC",
        iconURL: user.avatarURL({ extension:"png" }) || undefined,
    })
    .setTitle('💽 ' + tracks.title 
    ? (tracks.title.length > 255 ? tracks.title?.slice(0,250).concat("...") : tracks.title)
    : "")
    .setColor('Green')
    .setURL(tracks.url||"")
    .addFields({ name: '🏷️ Nguồn', value: `\`${tracks.channel?.name}\``, inline: true })
    .addFields({ name: '📢 Người thêm', value: `\`${user.username}\``, inline: true })
    .addFields({ name: '🎟️ Số lượng', value: `\`${tracks.videoCount} bài\``, inline: true })
    .setTimestamp()
    .setFooter({text: `_Developed by Binhkio_`})

module.exports = {
    playEmbed,
    endedEmbed,
    addEmbed,
    multiAddEmbed,
}
