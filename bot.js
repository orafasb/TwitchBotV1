/**
 * Config padrao Twitch// variaveis globais
 **/

const tmi = require("tmi.js");
const channel = "orafasb";
const config = {
  options: {
    debug: true,
  },
  connection: {
    cluster: "aws",
    reconnect: true,
  },
  identity: {
    username: "orafasb",
    password: "oauth:zhqug23257j4uzu58hze2wpgg5qd4a",
  },
  channels: [channel],
};
let prefix = "!";
let chalengeList = [];
let client = new tmi.client(config);
client.connect();

let port = process.env.PORT || 8080;
let server = app.listen(port, function () {
  console.log("app running on port 8080");
});

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
          "👾 I5 9400 F, GTX 1060 3GB Gygabite, Placa Mae Asus TUF B360M, 16GB Hyper X ddr4 ‍"
        );
        break;
      case "ping":
        client.say(channel, ` 👾 Pong...`);
        break;
      case "desafio":
        client.say(
          channel,
          `👾 digite o comando 👉🏻 !dado e ddesafie a galera... QUEM É O MELHOR??`
        );
        break;
      case "orafasb":
        client.say(
          channel,
          "👾  r4fasbA1 r4fasbA1 r4fasbA1 r4fasbA1 r4fasbA1 r4fasbA1"
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
    return "👾 Galera fiquem a vontade, qualquer ajuda sobre o código é sempre bem vinda! ";
  } else if (Math.floor(choice) == 2) {
    return "👾 Quer desafiar alguem no chat? Digite !dado e descubra quem é o campeão!";
  } else if (Math.floor(choice) == 3) {
    return "👾 Digite !comandos para listar todos os comandos disponíveis";
  } else {
    return "👾 Espero que estejam curtindo e que eu possa inspirar quem está por ai! ";
  }
}

let msgInterval = setInterval(() => {
  client.say(channel, rand({}));
}, 120000);
