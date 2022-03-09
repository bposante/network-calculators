module.exports = {
  name: "ping",
  description: "replies with pong",
  botAction: (message, args) => {
    message.channel.send("pong");
  },
};
