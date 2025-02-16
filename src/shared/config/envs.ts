import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  REDIS_DB: string;
  RABBITMQ_ENDPOINT:string

}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    RABBITMQ_ENDPOINT: joi.string().required(),
    REDIS_HOST: joi.string().required(),
    REDIS_PORT: joi.number().required(),
    REDIS_PASSWORD: joi.string().optional(),
    REDIS_DB: joi.string().required(),
    

    
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,

  DATABASE_URL: envVars.DATABASE_URL,
  RABBITMQ_ENDPOINT: envVars.RABBITMQ_ENDPOINT,
  
  REDIS_HOST: envVars.REDIS_HOST,
  REDIS_PORT: envVars.REDIS_PORT,
  REDIS_PASSWORD: envVars.REDIS_PASSWORD,
  REDIS_DB: envVars.REDIS_DB,
 
  
  
};
