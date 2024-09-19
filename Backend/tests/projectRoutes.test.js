const request = require('supertest');
const app = require('../server'); // Ensure you export the express app from server.js

describe('Project Routes', () => {
  it('should fetch all projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('length');
  });

  it('should create a new project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({ title: 'Test Project', description: 'Description of test project' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Test Project');
  });
});
