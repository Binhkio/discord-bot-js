const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { TOKEN_1, TOKEN_2 } = require('./config');
const fs = require('node:fs');
const path = require('node:path');
const { createAudioPlayer, NoSubscriberBehavior, generateDependencyReport } = require('@discordjs/voice');

const { keepAlive } = require('./server');

process.on('unhandledRejection', (reason, p) => {
	console.log("Reason", reason, "Promise", p);
}).on('uncaughtException', err => {
	console.log(err, "Error from uncaught exception..");
	// handleLogError(err);
});

console.log(generateDependencyReport());

keepAlive();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
	]
});

client.player = createAudioPlayer({
	behaviors: {
		noSubscriber: NoSubscriberBehavior.Play,
    },
});

client.player.queue = [];  // Array of Tracks
client.player.prevQueue = [];
client.player.isPlaying = false;
client.player.isLoop = false;
client.player.currMsg = null;

// Global variables
globalThis.client = client;

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
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}

		delete require.cache[require.resolve(filePath)];
	}
}

/**
 * Register events
 */
const discordEventFiles = fs.readdirSync('./events/discord').filter(file => file.endsWith('.js'));
const playerEventFiles = fs.readdirSync('./events/player').filter(file => file.endsWith('.js'));

for (const file of discordEventFiles) {
	const event = require(`./events/discord/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => {
			console.log(`[${new Date().toLocaleString()}] [Discord] [${event.name}]`);
			event.execute(...args)
		});
	} else {
		client.on(event.name, (...args) => {
			console.log(`[${new Date().toLocaleString()}] [Discord] [${event.name}]`);
			event.execute(...args)
		});
	}

	delete require.cache[require.resolve(`./events/discord/${file}`)];
}
for (const file of playerEventFiles) {
	const event = require(`./events/player/${file}`);

	client.player.addListener(event.name, (...args) => {
		console.log(`[${new Date().toLocaleString()}] [Event] [${event.name.toUpperCase()}]`);
		event.execute(...args);
	});

	delete require.cache[require.resolve(`./events/player/${file}`)];
}

client.login(TOKEN_1 + TOKEN_2);
