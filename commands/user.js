module.exports = {
  name: "user",
  description: "replies with info about the user",
  botAction: (message, args) => {
    let joined = message.member.joinedAt;
    message.reply(
      `your tag: ${message.author.tag}\nyour id: ${message.author.id}\nyou joined the server on ${joined}`
    );
  },
};
