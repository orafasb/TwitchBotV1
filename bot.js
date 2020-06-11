/**
 * Config padrao Twitch
 **/

var tmi = require("tmi.js");
var channel = "YourChanel";

var config = {
  options: {
    debug: true,
  },
  connection: {
    cluster: "aws",
    reconnect: true,
  },
  identity: {
    username: "YourChannel",
    password: "Password",
  },
  channels: [channel],
};

var client = new tmi.client(config);
client.connect();

client.on("connected", (address, port) => {
  client.action(channel, "The bot has connected on " + address + ":" + port);
});

/**
 * Inicio
 **/

client.on("chat", (channel, user, message, self) => {
  if (self) return;
  if (message === "!comandos") {
    client.say(
      channel,
      `Olá ${user["display-name"]}, os comandos são !dado e !setup `
    );
  }
});

client.on("chat", (channel, _, message, self) => {
  if (self) return;
  if (message === "!setup") {
    client.say(
      channel,
      "I5 9400 F, GTX 1060 3GB Gygabite Placa Mae Asus TUF B360M, 16GB Hyper X ddr4"
    );
  }
});

/**
 * Dado
 **/

client.on("chat", (channel, _, message, self) => {
  if (self) return;
  if (message.startsWith("!dado")) {
    client.say(channel, `Você tirou ${dado()}`);
  }
});

function dado(min = 1, max = 7) {
  var choice = Math.random() * (max - min) + min;
  choice = Math.floor(choice);
  return choice;
}

/**
 * Menssagens intervaladas
 **/

function rand({ min = 1, max = 6 }) {
  const choice = Math.random() * (max - min) + min;
  Math.floor(choice);

  if (Math.floor(choice) == 1) {
    return "Galera fiquem a vontade, qualquer ajuda sobre o código é sempre bem vinda! ";
  } else if (Math.floor(choice) == 2) {
    return "Você já conhece meu canal no youtube?  ";
  } else if (Math.floor(choice) == 3) {
    return "Use o !comandos para saber mais.";
  } else {
    return "Espero que estejam curtindo e que eu possa inspirar quem está por ai! ";
  }
}

let msgInterval = setInterval(() => {
  client.say(channel, rand({}));
}, 70000);
