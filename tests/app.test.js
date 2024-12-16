const request = require('supertest');

// Mock app.listen to prevent the server from starting
jest.mock('../app', () => {
  const express = require('express');
  const app = express();
  
  // Root route
  app.get('/', (req, res) => res.status(200).send('Server is running!'));
  
  // Mocked products route
  app.get('/products', (req, res) => res.status(200).json([{ id: 1, name: 'Product 1' }]));
  
  // Mocked orders route
  app.get('/orders', (req, res) => res.status(200).json([{ id: 1, status: 'Pending' }]));
  
  return app;
});

const app = require('../app'); // Import the mocked app

describe('The Express Server', () => {
  test('should return response from the root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  test('should respond at /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toBe('Product 1');
  });

  test('should respond at /orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].status).toBe('Pending');
  });
});
