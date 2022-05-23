import fetch from 'node-fetch';
import db from '../Back_End/DB.js';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const kafka = require('kafka-node');

const zookeeperIP = 'localhost'
const zookeeperPort = '2181'

const options = {
    groupId: 'kafka-node-group',
    fromOffset: 'latest',
    sessionTimeout: 6000
}
const topics = [{
    topic: "LineMsg"
}]

const client = new kafka.KafkaClient(zookeeperIP + ":" + zookeeperPort)
const consumer = new kafka.Consumer(client, topics, options)

consumer.on('message', function(message) {
    try {
        let msg = message.value.split('==========')
        // get db line info
        db.getLineInfo(msg[0], msg[1]).then(function(result){
            let access_token = result[0]
            let channel_secret = result[1]

            // send line msg
            let url = "https://mozixbot.ebg.tw/broadcast"
            let body = {
                "access_token": access_token,
                "channel_secret": channel_secret,
                "message": msg[2]
            }
            fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(response => response.json())
            .then(json => console.log(json))
        });
    } catch (exception) {
        console.log("Send Line Msg Error", exception)
    }
})