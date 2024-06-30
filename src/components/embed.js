const { EmbedBuilder } = require("discord.js")

const playEmbed = (queue, track) => new EmbedBuilder()
    .setAuthor({
        name: "🔥 ĐANG PHÁT 🔥",
        iconURL: track?.user?.avatarURL({ extension: 'png' }) || undefined,
    })
    .setTitle('🎶🎶 ' + track?.title
        ? (track?.title?.length > 255 ? track?.title?.slice(0, 250)?.concat("...") : track?.title)
        : "")
    .setColor('Blue')
    .setImage(track?.thumbnails[0]?.url)
    .setURL(track?.url)
    .addFields({ name: '🪪 Nguồn', value: `\`${track?.channel?.name}\``, inline: true })
    .addFields({ name: '🏷️ Người thêm', value: `\`${track?.user?.username}\``, inline: true })
    .addFields({ name: '🕖 Thời lượng', value: `\`${track?.durationRaw}\``, inline: true })
    .addFields({ name: '💽 Hàng chờ', value: `\`${queue?.length}\``, inline: true })
    .setTimestamp()
    .setFooter({ text: "_Developed by Binhkio_" })

const endedEmbed = (track) => new EmbedBuilder()
    .setAuthor({
        name: "🔥 ĐÃ PHÁT 🔥",
        iconURL: track?.user?.avatarURL({ extension: 'png' }) || undefined,
    })
    .setTitle(track?.title
        ? (track?.title?.length > 255 ? track?.title?.slice(0, 250)?.concat("...") : track?.title)
        : "")
    .setURL(track?.url)
    .setColor('Blue')
    .setTimestamp()
    .setFooter({ text: `_Developed by Binhkio_` })

const addEmbed = (queue, track) => new EmbedBuilder()
    .setAuthor({
        name: "✅ THÊM NHẠC",
        iconURL: track?.user?.avatarURL({ extension: "png" }) || undefined,
    })
    .setTitle('🎶🎶 ' + track?.title
        ? (track?.title?.length > 255 ? track?.title?.slice(0, 250)?.concat("...") : track?.title)
        : "")
    .setColor('Green')
    .setURL(track?.url)
    .addFields({ name: '🪪 Nguồn', value: `\`${track?.channel?.name}\``, inline: true })
    .addFields({ name: '🏷️ Người thêm', value: `\`${track?.user?.username}\``, inline: true })
    .addFields({ name: '🕖 Thời lượng', value: `\`${track?.durationRaw}\``, inline: true })
    .addFields({ name: '💽 Danh sách', value: `\`${queue?.length}\``, inline: true })
    .setTimestamp()
    .setFooter({ text: `_Developed by Binhkio_` })

const multiAddEmbed = (queue, info, tracks) => new EmbedBuilder()
    .setAuthor({
        name: "✅ THÊM DANH SÁCH NHẠC",
        iconURL: tracks[0]?.user?.avatarURL({ extension: "png" }) || undefined,
    })
    .setTitle('💽 ' + info?.title
        ? (info?.title?.length > 255 ? info?.title?.slice(0, 250)?.concat("...") : info?.title)
        : "")
    .setColor('Green')
    .setURL(info?.url || "")
    .addFields({ name: '🪪 Nguồn', value: `\`${info?.channel?.name}\``, inline: true })
    .addFields({ name: '🏷️ Người thêm', value: `\`${tracks[0]?.user?.username}\``, inline: true })
    .addFields({ name: '🎟️ Số lượng', value: `\`${tracks?.length} bài\``, inline: true })
    .addFields({ name: '💽 Danh sách', value: `\`${queue?.length}\``, inline: true })
    .setTimestamp()
    .setFooter({ text: `_Developed by Binhkio_` })

module.exports = {
    playEmbed,
    endedEmbed,
    addEmbed,
    multiAddEmbed,
}
