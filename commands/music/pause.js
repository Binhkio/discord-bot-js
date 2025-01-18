const { SlashCommandBuilder, CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause player'),
    /**
     *
     * @param {CommandInteraction} interaction
     * @returns
     */
    async execute(interaction) {
        const player = global.client.player;

        if (!player.isPlaying)
            return interaction.editReply({
                content: `No music currently playing... try again ? ❌`,
                ephemeral: true,
            });

        player.emit('pause');

        interaction.deleteReply();
    },
};
