import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API Node.js & MongoDB',
      version: '1.0.0',
      description: 'API documentation for E-commerce assignment',
    },
    servers: [
      { url: 'http://localhost:5000' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            price: { type: 'number' },
            stock: { type: 'integer' },
            category: { type: 'string', description: 'Category ID' },
            description: { type: 'string' },
            imageUrl: { type: 'string' }
          }
        },
        Cart: {
            type: 'object',
            properties: {
                items: { type: 'array', items: { type: 'object' } }
            }
        },
        Order: {
            type: 'object',
            properties: {
                totalAmount: { type: 'number' },
                status: { type: 'string' }
            }
        }
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);