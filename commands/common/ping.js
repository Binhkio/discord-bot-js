const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const client = global.client;
        await interaction.editReply('Ping ???');
        setTimeout(() => {
            interaction.editReply(`**Pong!**\nAPI Latency is ${Math.round(client.ws.ping)}ms 🛰️, Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago`);
        }, 1000 * 2);
    },
};