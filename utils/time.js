const calcTime = (offset) => {
    const curOffset = offset || 7;
    var now = new Date();
    return new Date(now.getTime() + curOffset * 60 * 60 * 1000);
}

// export const handleGreetJoin = async (name, voiceConnection, guildId) => {
//     const nowHour = new Date(calcTime()).getHours();
//     console.log(nowHour);
//     const greetingTime = nowHour < 12 ? 'buổi sáng' : nowHour < 18 ? 'buổi chiều' : 'buổi tối';
//     const greeting = `Chào ${greetingTime} ${name}`;
//     await textToSpeech(greeting, voiceConnection, guildId);
// }

// export const handleGreetLeave = async (name, voiceConnection, guildId) => {
//     const greeting = `Tạm biệt ${name}`;
//     await textToSpeech(greeting, voiceConnection, guildId);
// }

module.exports = {
    calcTime,
}
