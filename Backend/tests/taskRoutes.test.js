const request = require('supertest');
const app = require('../server'); // Ensure you export the express app from server.js

describe('Task Routes', () => {
  it('should fetch tasks by project ID', async () => {
    const projectId = 'some_project_id';
    const res = await request(app).get(`/api/projects/${projectId}/tasks`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a task to a project', async () => {
    const projectId = 'some_project_id';
    const res = await request(app)
      .post(`/api/projects/${projectId}/tasks`)
      .send({ title: 'Test Task', description: 'Task description', status: 'Pending', dueDate: new Date() });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Test Task');
  });
});
