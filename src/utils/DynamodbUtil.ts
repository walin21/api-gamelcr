import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb";
import * as dotenv from 'dotenv';

dotenv.config();

const dynamodb = new DynamoDBClient({region: process.env.aws_region});
const documentClient = DynamoDBDocumentClient.from(dynamodb)

export class DynamodbUtil {
    static insertData(params) {
        return new Promise((resolve, reject) => {
            return documentClient.send(new PutCommand(params));
        });
    }
}