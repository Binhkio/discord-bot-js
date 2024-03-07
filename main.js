const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { TOKEN_1, TOKEN_2 } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { createAudioPlayer } = require('@discordjs/voice');
const { keepAlive } = require('./server');

process.on('unhandledRejection', (reason, p) => {
	console.log("Reason", reason, "Promise", p);
}).on('uncaughtException', err => {
	console.error(err);
	// handleLogError(err);
});

keepAlive();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
	]
});

client.player = createAudioPlayer();
client.player.isPlaying = false;
client.player.loop = 0; // 0-Disabled | 1-Track | 2-Queue
client.player.queue = [];
client.player.currIndex = -1;
client.player.currMsg = null;
client.player.voiceConnection = null;
client.test = 2002;

/**
 * Register commands
 */
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			console.log(`[SUCCESS] Command: ${command.data.name}`);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

/**
 * Register events
 */
const commonEventFiles = fs.readdirSync('./events/common').filter(file => file.endsWith('.js'));
const playerEventFiles = fs.readdirSync('./events/player').filter(file => file.endsWith('.js'));

for (const file of commonEventFiles) {
	const event = require(`./events/common/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
for (const file of playerEventFiles) {
	const event = require(`./events/player/${file}`);

	client.player.addListener(event.name, (...args) => event.execute(...args));
}

client.login(TOKEN_1 + TOKEN_2);
