#!/usr/bin/env nodejs
//Requisitamos a biblioteca de envio
var amqp = require('amqplib/callback_api');
//Abrimos a conexão com o RabbitMQ
amqp.connect('amqp://localhost', function(err, conn) {
  //Criamos um canal
  conn.createChannel(function(err, ch) {
    //Definimos o nome da queue que vamos ouvir
    var q = 'hello';
    //Recriamos a queue apenas para ter certeza que ela existe.
    //Se ela já existir nada acontece
    ch.assertQueue(q, {durable: false});
    //Dou um log apenas para teste
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    //Consumo a mensagem, basicamente fico aguardando e quando receber jogo a mensagem no log
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});