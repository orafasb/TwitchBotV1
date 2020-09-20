/**
 * Config padrao Twitch// variaveis globais
 **/

<<<<<<< HEAD
const tmi = require('tmi.js');
const channel = 'orafasb';
=======
const tmi = require("tmi.js");
const channel = "Your channel";
>>>>>>> b04f8db7f1ae985e22792533c64513802938ca9f
const config = {
  options: {
    debug: true,
  },
  connection: {
<<<<<<< HEAD
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: 'orafasb',
    password: 'oauth:zhqug23257j4uzu58hze2wpgg5qd4a',
  },
  channels: [channel],
};
let prefix = '!';
=======
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
>>>>>>> b04f8db7f1ae985e22792533c64513802938ca9f
let chalengeList = [];
let client = new tmi.client(config);``
client.connect();

//ClientConect
<<<<<<< HEAD
client.on('connected', (address, port) => {
  client.action(channel, 'The bot has connected on ' + address + ':' + port);
=======
client.on("connected", (address, port) => {
  client.action(channel, "The bot has connected on " + address + ":" + port);
>>>>>>> b04f8db7f1ae985e22792533c64513802938ca9f
});

/**
 * interacoes no chat
 **/

<<<<<<< HEAD
client.on('chat', (channel, user, message, self) => {
  if (self) return;
  if (message.startsWith(prefix)) {
    let comando = message.toLowerCase().split(' ')[0].slice(1);
    switch (comando) {
      case 'comandos':
        client.say(
          channel,
          ` 👾 Olá ${user['display-name']}, os comandos são 👉🏻 !desafio, !ping, !dado, !setup e !orafasb`
        );
        break;
      case 'setup':
        client.say(
          channel,
          '👾 I5 9400 F, GTX 1060 3GB Gygabite, Placa Mae Asus TUF B360M, 16GB Hyper X ddr4 ‍'
        );
        break;
      case 'ping':
        client.say(channel, ` 👾 Pong...`);
        break;
      case 'desafio':
        client.say(
          channel,
          `👾 digite o comando 👉🏻 !dado e ddesafie a galera... QUEM É O MELHOR??`
        );
        break;
      case 'orafasb':
        client.say(
          channel,
          '👾  r4fasbA1 r4fasbA1 r4fasbA1 r4fasbA1 r4fasbA1 r4fasbA1'
=======
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
>>>>>>> b04f8db7f1ae985e22792533c64513802938ca9f
        );
    }
  }
});

/**
 * Disputa de Dado.
 **/

<<<<<<< HEAD
client.on('chat', (channel, user, message, self) => {
  if (self) return;
  if (message.startsWith('!dado')) {
    let chalenge = {
      nome: user['display-name'],
=======
client.on("chat", (channel, user, message, self) => {
  if (self) return;
  if (message.startsWith("!dado")) {
    let chalenge = {
      nome: user["display-name"],
>>>>>>> b04f8db7f1ae985e22792533c64513802938ca9f
      valor: 0,
    };

    if (chalengeList.length > 0) {
      if (chalengeList[0].nome == chalenge.nome) {
        client.say(
          channel,
<<<<<<< HEAD
          `${user['display-name']}👾 Aguarde até que outro jogador lance os dados...👉🏻`
=======
          `${user["display-name"]}👾 Aguarde até que outro jogador lance os dados...👉🏻`
>>>>>>> b04f8db7f1ae985e22792533c64513802938ca9f
        );
        return;
      }
    }

    chalenge.valor = dado();

    client.say(channel, ` ${chalenge.nome} tirou ${chalenge.valor}`);
<<<<<<< HEAD
    // console.log(chalenge);

    chalengeList.push(chalenge);

    // console.log(chalengeList.length);
    if (chalengeList.length >= 2) {
      // console.log(chalengeList);
      let vencedor = {
        nome: '',
        valor: '',
=======
    console.log(chalenge);

    chalengeList.push(chalenge);

    console.log(chalengeList.length);
    if (chalengeList.length >= 2) {
      console.log(chalengeList);
      let vencedor = {
        nome: "",
        valor: "",
>>>>>>> b04f8db7f1ae985e22792533c64513802938ca9f
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

<<<<<<< HEAD
function randmsg({ min = 1, max = 4 }) {
=======
function rand({ min = 1, max = 4 }) {
>>>>>>> b04f8db7f1ae985e22792533c64513802938ca9f
  const choice = Math.random() * (max - min) + min;
  Math.floor(choice);

  if (Math.floor(choice) == 1) {
<<<<<<< HEAD
    return '👾 Galera fiquem a vontade, qualquer ajuda sobre o código é sempre bem vinda! ';
  } else if (Math.floor(choice) == 2) {
    return '👾 Quer desafiar alguem no chat? Digite !dado e descubra quem é o campeão!';
  } else if (Math.floor(choice) == 3) {
    return '👾 Digite !comandos para listar todos os comandos disponíveis';
  } else {
    return '👾 Espero que estejam curtindo e que eu possa inspirar quem está por ai! ';
  }
}


let msgInterval = setInterval(() => {
  client.say(channel, randmsg({}));
=======
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
>>>>>>> b04f8db7f1ae985e22792533c64513802938ca9f
}, 120000);
