const $ = require('meeko')
const amqp = require('amqplib')
$.option.logTime = false
module.exports = async (rmq) => {
  try {
    const MQ = await amqp.connect({
      protocol: rmq.protocol,
      hostname: rmq.host,
      port: rmq.port,
      username: rmq.login,
      password: rmq.password,
      locale: 'en_US',
      frameMax: 0,
      heartbeat: 0,
      vhost: rmq.vhost
    })

    MQ.on('error', function (e) {
      $.err($.c.r('✘'), `-x- rabbitMQ [${$.c.y(`${rmq.host} : ${rmq.port}`)}] disconnect...`)
    })

    $.log($.c.g('✔'), `rabbitMQ [${$.c.y(`${rmq.host} : ${rmq.port}`)}]`)

    return MQ
  } catch (e) {
    $.err($.c.r('✘'), `-x- rabbitMQ [${$.c.y(`${rmq.host} : ${rmq.port}`)}] disconnect...`)
  }
  return false
}
