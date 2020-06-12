/**
 * Config padrao Twitch// variaveis globais
 **/

const tmi = require("tmi.js");
const channel = "Your channel";
const config = {
  options: {
    debug: true,
  },
  connection: {
    cluster: "aws",
    reconnect: true,
  },
  identity: {
    username: "Your channel",
    password: "Pasword",
  },
  channels: [channel],
};
let prefix = "!";
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
  if (message.startsWith(prefix)) {
    let comando = message.toLowerCase().split(" ")[0].slice(1);
    switch (comando) {
      case "comandos":
        client.say(
          channel,
          ` 👾 Olá ${user["display-name"]}, os comandos são 👉🏻 !desafio, !ping, !dado, !setup e !orafasb`
        );
        break;
      case "setup":
        client.say(
          channel,
          "👾 Digite aqui sua msg "
        );
        break;
      case "ping":
        client.say(channel, ` 👾 Pong...`);
        break;
      case "desafio":
        client.say(
          channel,
          `👾 Digite aqui sua msg `
        );
        break;
      case "orafasb":
        client.say(
          channel,
          "👾  Digite aqui sua msg "
        );
    }
  }
});

/**
 * Disputa de Dado.
 **/

client.on("chat", (channel, user, message, self) => {
  if (self) return;
  if (message.startsWith("!dado")) {
    let chalenge = {
      nome: user["display-name"],
      valor: 0,
    };

    if (chalengeList.length > 0) {
      if (chalengeList[0].nome == chalenge.nome) {
        client.say(
          channel,
          `${user["display-name"]}👾 Aguarde até que outro jogador lance os dados...👉🏻`
        );
        return;
      }
    }

    chalenge.valor = dado();

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
          `👾 O jogo empatou entre 👉🏻 ${chalengeList[0].nome} e ${chalengeList[1].nome}! `
        );
      } else {
        client.say(
          channel,
          `👾 ${vencedor.nome} 👉🏻 ganhou com valor: ${vencedor.valor}`
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

function rand({ min = 1, max = 4 }) {
  const choice = Math.random() * (max - min) + min;
  Math.floor(choice);

  if (Math.floor(choice) == 1) {
    return "👾 Digite aqui sua msg 1";
  } else if (Math.floor(choice) == 2) {
    return "👾 Digite aqui sua msg 2";
  } else if (Math.floor(choice) == 3) {
    return "👾 Digite aqui sua msg 3";
  } else {
    return "👾 Digite aqui sua msg  4 ";
  }
}

let msgInterval = setInterval(() => {
  client.say(channel, rand({}));
}, 120000);
