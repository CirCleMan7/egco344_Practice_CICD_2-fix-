const request = require('supertest');
const app = require('../index');
describe('Electricity API Endpoints', () => {
    // Test Case 1: Total Usage
    it('should return total electricity usage for all years', async () => {
        const res = await request(app).get('/api/usages/totalyear');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
        expect(res.body).toHaveProperty('total_usage'); // สมมติว่ามี field นี้
    });

    // Test Case 2: Total users
    it('should return total electricity users for all years', async () => {
        const res = await request(app).get('/api/users/totalyear');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });

    // Test Case 3: Specific Province Usages
    it('should return electricity usage for a specific province and year', async () => {
        const res = await request(app).get('/api/usages/Kamphaeng Phet/2566');
        expect(res.status).toBe(200);
        expect(res.body.province_name).toBe('Kamphaeng Phet');
        expect(res.body.year).toBe(2566);
    });

    // Test Case 4: Specific Province Users
    it('should return electricity users for a specific province and year', async () => {
        const res = await request(app).get('/api/users/Kamphaeng Phet/2566');
        expect(res.status).toBe(200);
        expect(res.body.province_name).toBe('Kamphaeng Phet');
        expect(res.body.year).toBe(2566);
    });

    // Test Case 5: usage history for a specific province
    it('should return usage history for a specific province', async () => {
        const res = await request(app).get('/api/pastusages/Khon Kaen');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
            expect(res.body[0].province_name).toBe('Khon Kaen');
        }
    });

    // Test Case 6: users history for a specific province
    it('should return users history for a specific province', async () => {
        const res = await request(app).get('/api/pastusers/Khon Kaen');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
            expect(res.body[0].province_name).toBe('Khon Kaen');
        }
    });

    // Test Case 7: Invalid Path (Total Usage)
    it('should return 404 for incorrect endpoint (totalyears)', async () => {
        const res = await request(app).get('/api/usages/totalyears'); // ผิดที่เติม s
        expect(res.status).toBe(404);
    });

    // Test Case 8: Invalid Path (Total users)
    it('should return 404 for incorrect endpoint (totalyears)', async () => {
        const res = await request(app).get('/api/users/totalyears'); // ผิดที่เติม s
        expect(res.status).toBe(404);
    });

    // Test Case 9: Invalid Province Name (Usages)
    it('should return 404 for non-existent province name', async () => {
        const res = await request(app).get('/api/usages/Invalid_Province/2566');
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message'); // เช็คว่ามีข้อความแจ้งเตือน
    });

    // Test Case 10: Invalid Year Format (Users)
    it('should return 400 or 404 for invalid year format', async () => {
        const res = await request(app).get('/api/users/Kamphaeng Phet/256'); // ปีไม่ครบหลัก
        expect(res.status).toBe(404); 
    });

    // Test Case 11: Invalid Province ID/Name (usage history)
    it('should return empty array or 404 for numeric province name', async () => {
        const res = await request(app).get('/api/pastusages/123');
        // ขึ้นอยู่กับการออกแบบ: ถ้าหาไม่เจออาจเป็น [] หรือ 404
        expect(res.statusCode).toBe(404);
    });

    // Test Case 12: Invalid Province ID/Name (users history)
    it('should return empty array or 404 for numeric province name', async () => {
        const res = await request(app).get('/api/pastusers/123');
        expect(res.statusCode).toBe(404);
    });
});

