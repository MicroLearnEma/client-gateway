import 'dotenv/config'

import Joi, * as joi from 'joi'

interface EnvVars {
    APP_PORT: number
    NATS_SERVERS: string[]
}


const envSchema = joi.object<EnvVars>({
    APP_PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required()
}).unknown(true);

const { error, value } = envSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env?.NATS_SERVERS.split(",")
});

const envVars: EnvVars = value;

if(error) throw new Error(`Config validation error ${error.message}`);

export const env = {
    port: envVars.APP_PORT,
    nats_servers: envVars.NATS_SERVERS
}
