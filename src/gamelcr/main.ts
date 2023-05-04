import { APIGatewayProxyHandler } from 'aws-lambda';
import { createClient } from 'redis';
import * as dotenv from 'dotenv';
import { initGame } from './gamelcr';
import { EventBridge } from 'aws-sdk';
import { insSQSTable } from '../controllers/sendsqscontroller'

dotenv.config();
const eventbridge = new EventBridge();
const client = createClient({
    host: process.env.redis_host,
    port: process.env.redis_port
});

export const handler: APIGatewayProxyHandler = async (event, context, callback) => {
    let response: String = '';
    try {
        await client.connect();
        let data = JSON.parse(event.body);
        let item: String = await client.get(String(data.id)) || '';
        response = initGame(item);
        const data_event = await putEvent(item, response);
        insSQSTable(item, response);
    }
    catch (e) {
        let item: String = "3 LR.CCR.L.RLLLCLR.LL..R...CLR.";
        response = initGame(item);
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            resultado: response
        })
    }
}

function putEvent(item, response) {
    const detail = {
        item: item,
        response: response
    };

    var params = {
        Entries: [
            {
                EventBusName: process.env.aws_bus_name,
                Detail: JSON.stringify(detail),
                DetailType: 'Algoritmo para resolver el juego LCR',
                Source: 'gamelcr-app',
            },
        ]
    };

    return eventbridge.putEvents(params).promise();
}