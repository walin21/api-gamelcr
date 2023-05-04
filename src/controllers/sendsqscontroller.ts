import { randomUUID  } from 'crypto';
import * as dotenv from 'dotenv';
import { DynamodbUtil } from '../utils/DynamodbUtil';

dotenv.config();
const uuid = randomUUID();

export function insSQSTable(sequence: String, response: String) {
    try{
        let objects = {};
        objects['id'] = uuid;
        objects['sequence'] = sequence;
        objects['response'] = response;

        let params = {
            TableName: process.env.aws_dynamodb_table,
            Item: objects,
        }
        return DynamodbUtil.insertData(params);
    }
    catch(e){
        console.log("Se encontro un problema al insertar los datos en la tabla de DynamoDB", e)
    }
};