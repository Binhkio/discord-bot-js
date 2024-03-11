const { Events, InteractionType } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		await interaction.deferReply();

		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				interaction.editReply(`❌ | No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
				console.log(`[${interaction.commandName}]`);
			} catch (error) {
				console.error(error);
				await interaction.editReply({
					content: '❌ ' + error?.message || 'There was an error while executing this command!',
					ephemeral: true
				});
			}
		}

		if (interaction.type === InteractionType.MessageComponent) {
			const customId = JSON.parse(interaction.customId);
			const fileBtn = customId.ffb;
			if (fileBtn) {
				const btn = require(`../button/${fileBtn}.js`);
				if (btn) return btn.execute({ interaction, customId });
			}
		}
	},
};
