#!/usr/bin/env nodejs

//Requisitamos a biblioteca de envio
var amqp = require('amqplib/callback_api');
//Conectamos ao RabbitMQ. No caso esta instalado na máquina local
amqp.connect('amqp://127.0.0.1', function(err, conn) {
  //Criamos um canal
  conn.createChannel(function(err, ch) {
    //nome da queue
    var q = 'hello';
    //mensagem que estará na queue
    var msg = 'Hello World!';
    //Crio a queue, dou um nome a ela e digo que ela não vai ser durável
    //É importante dizer que você pode dar esse comando quantas vezes
    //quiser, a query só será criada se nenhuma query com esse nome existir
    ch.assertQueue(q, {durable: false});
    /* Note: on Node 6 Buffer.from(msg) should be used
    *  Mando a mensagem para dentro da queue com a função sendToQueue
    */
    ch.sendToQueue(q, new Buffer(msg));
    //Dou um console log apenas para teste
    console.log(" [x] Sent %s", msg);
    //Aqui vamos fechar a conexão
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });  
});