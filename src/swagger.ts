import swaggerJSDoc from 'swagger-jsdoc';
import { JSONSchema7 } from 'json-schema';

import userSchema from '../schema/user-response.schema.json';
import createUserSchema from '../schema/create-user.schema.json';

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple Express API with Swagger',
            version: '1.0.0',
            description: 'Demo API with full CRUD and Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            schemas: {
                UserResponseDto: userSchema as JSONSchema7,
                CreateUserDto: createUserSchema as JSONSchema7,
            },
        },
    },
    apis: ['./src/routes/*.ts'],
});
