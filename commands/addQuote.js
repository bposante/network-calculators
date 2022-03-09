const addQuote = (module.exports = {
  name: "addquote",
  description: "adds a quote to the blackmail database",
  usage: "!addquote 'quote to be added' 'person that said quote'",
  botAction: async (message, args) => {
    const Quotes = require("../main").table;
    const quoteName = args.slice(0, args.length - 1).join(" ");
    const date = new Date().toLocaleDateString();
    if (args.length < 2) {
      return message.reply(`usage: ${addQuote.usage}`);
    }
    try {
      const quote = await Quotes.create({
        quote: quoteName,
        author: args[args.length - 1],
        date: date,
      });
      console.log("quote added at", date);
      console.log(quote.quote, "by ->", quote.author);
      return message.reply(`quote added`);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return message.reply("that quote already exists");
      }
      console.log("addquote -> ", error);
      return message.reply("something went wrong. check out the command usage:", quote.usage);
    }
  },
});
