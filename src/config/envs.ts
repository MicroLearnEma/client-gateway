import 'dotenv/config'

import Joi, * as joi from 'joi'

interface EnvVars {
    APP_PORT: number
    PRODUCTS_MS_HOST: string
    PRODUCTS_MS_PORT: number
    ORDERS_MS_HOST: string
    ORDERS_MS_PORT: number
}


const envSchema = joi.object<EnvVars>({
    APP_PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
    ORDERS_MS_HOST: joi.string().required(),
    ORDERS_MS_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

const envVars: EnvVars = value;

if(error) throw new Error(`Config validation error ${error.message}`);

export const env = {
    port: envVars.APP_PORT,
    productsMicroserviceHost: envVars.PRODUCTS_MS_HOST,
    productsMicroservicePort: envVars.PRODUCTS_MS_PORT,
    ordersMicroserviceHost: envVars.ORDERS_MS_HOST,
    ordersMicroservicePort: envVars.ORDERS_MS_PORT,
}


