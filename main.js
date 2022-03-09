const fs = require("fs");
const Sequelize = require("sequelize");
const { Client, Collection } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const PREFIX = "!";
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

module.exports = {
  table: (Quotes = sequelize.define("quotes", {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    quote: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
  })),
};

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}!`);
  Quotes.sync({ force: true });
});

client.commands = new Collection();

client.on("messageCreate", (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;
  const [commandName, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
  const command = client.commands.get(commandName);
  if (!command) return;
  client.commands.get(commandName)(message, args);
});

const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command.botAction);
}

client.login(token);
