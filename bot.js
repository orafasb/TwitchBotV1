/**
 * Config padrao Twitch// variaveis globais
 **/
const tmi = require("tmi.js");
const channel = "channel";
const config = {
  options: {
    debug: true,
  },
  connection: {
    cluster: "aws",
    reconnect: true,
  },
  identity: {
    username: "channel",
    password: "chavetwitch",
  },
  channels: [channel],
};

let chalengeList = [];
let client = new tmi.client(config);
client.connect();

//ClientConect
client.on("connected", (address, port) => {
  client.action(channel, "The bot has connected on " + address + ":" + port);
});

/**
 * interacoes no chat
 **/

client.on("chat", (channel, user, message, self) => {
  if (self) return;
  if (message === "!comandos") {
    client.say(
      channel,
      ` 👾 Olá ${user["display-name"]}, os comandos são !dado e !setup `
    );
  }
});

client.on("chat", (channel, _, message, self) => {
  if (self) return;
  if (message === "!setup") {
    client.say(
      channel,
      "👾 Digite usua msg aqui ‍"
    );
  }
});

/**
 * Disputa de dados.
 **/

client.on("chat", (channel, user, message, self) => {
  if (self) return;
  if (message.startsWith("!dado")) {
    let chalenge = {
      nome: user["display-name"],
      valor: dado(),
    };

    client.say(channel, ` ${chalenge.nome} tirou ${chalenge.valor}`);
    console.log(chalenge);

    chalengeList.push(chalenge);
    console.log(chalengeList.length);
    if (chalengeList.length >= 2) {
      console.log(chalengeList);
      let vencedor = {
        nome: "",
        valor: "",
      };
      let empate = false;
      chalengeList.forEach((chalenger) => {
        if (vencedor === null) {
          vencedor = chalenger;
        } else if (vencedor.valor < chalenger.valor) {
          vencedor = chalenger;
        } else if (vencedor.valor === chalenger.valor) {
          empate = true;
        }
      });
      if (empate) {
        client.say(
          channel,
          `👾 O jogo empatou entre ${chalengeList[0].nome} e ${chalengeList[1].nome}! `
        );
      } else {
        client.say(
          channel,
          `👾 ${vencedor.nome} ganhou com valor: ${vencedor.valor}`
        );
      }
      chalengeList = [];
      console.log(vencedor);
    }
  }
});

function dado(min = 1, max = 7) {
  choice = Math.random() * (max - min) + min;
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
    return "👾 Digite sua msg aqui ";
  } else if (Math.floor(choice) == 2) {
    return "👾  Digite sua msg aqui 2";
  } else if (Math.floor(choice) == 3) {
    return "👾  Digite sua msg aqui 3";
  } else {
    return "👾  Digite sua msg aqui 4 ";
  }
}

let msgInterval = setInterval(() => {
  client.say(channel, rand({}));
}, 100000);
