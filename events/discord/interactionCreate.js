const { Events, InteractionType, CommandInteraction } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  /**
   *
   * @param {CommandInteraction} interaction
   * @returns
   */
  async execute(interaction) {
    if (interaction) await interaction.deferReply();

    if (interaction.type === InteractionType.ApplicationCommand) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        await interaction.editReply(
          `❌ | No command matching ${interaction.commandName} was found.`,
        );
        return;
      }

      try {
        console.log(
          `[${new Date().toLocaleString()}] [Command] [${interaction.commandName.toUpperCase()}]`,
        );
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.editReply({
          content:
            "❌ " + error?.message ||
            "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }

    if (interaction.type === InteractionType.MessageComponent) {
      const customId = JSON.parse(interaction.customId);
      const fileBtn = customId.ffb;
      if (fileBtn) {
        const btn = require(`../button/${fileBtn}.js`);
        if (btn) {
          console.log(
            `[${new Date().toLocaleString()}] [Button] [${btn.name.toUpperCase()}]`,
          );
          return btn.execute({ interaction, customId });
        }
      }
    }
  },
};
