const Quotes = require("../main").table;
const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

// need to add args so a user can get quotes just from a specific person

const getQuote = (module.exports = {
  name: "quote",
  description: "returns a random quote",
  usage: "!quote",
  botAction: async (message, args) => {
    if (args[0] && args[0].toLowerCase() === "me") {
      return message.reply("fuck u carson");
    }
    try {
      let quote = await Quotes.findOne({ order: sequelize.random() });
      if (quote) {
        return message.reply(`"${quote.get("quote")}" said by ${quote.get("author")}`);
      } else {
        return message.reply(`no quotes available`);
      }
    } catch (error) {
      console.log(error);
      return message.reply(`something went wrong. check out the command usage: ${getQuote.usage}`);
    }
  },
});
