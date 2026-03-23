const request = require('supertest');
const app = require('../index');
describe('Electricity API Endpoints', () => {

 // Test Case 1: Total Usage
    it('should return the total electricity usage', async () => {
        const res = await request(app).get('api/usage/totalyear');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });

 // Test Case 2: Specific Province Usage
    it('should return electricity usage for a specific province', async () => {
        const res = await request(app).get('api/usage/Alberta/2566');
        expect(typeof res.body).toBe('object');
    });

 // Test Case 3: Verify Data Structure for Users
    it('should return total electricity users for all years', async () => {
        const res = await request(app).get('/api/pastusers/Bangkok');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});