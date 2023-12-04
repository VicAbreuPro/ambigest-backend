import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AuthController', () => {
  let app: any;

  // Execute start operations before all the tests
  beforeAll(async () => {
    // Set API for test environment
    const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    }).compile();

    // Build app for test
    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    // Initialize built app
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
        it('should return a empty body code when the login credentials is does not exist on the database', async () => {
            const loginData = {
                email: 'test@gmail.com',
                password: 'test',
            };

            // Call POST method
            const response = await request(app.getHttpServer())
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(loginData)
                
            expect(response.body).toEqual({})
        });

        it('should return a bad request code when the login credential is not valid', async () => {
            const loginData = {
                password: 'test',
            };
    
            const response = await request(app.getHttpServer())
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(loginData)
    
            expect(response.status).toBe(400);
        });

        it('should return 200 code with token in body', async () => {
            const loginData = {
                email: 'victor.abreu09@gmail.com',
                password: 'Ambigest123',
            };

            const response = await request(app.getHttpServer())
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(loginData)
            .expect((res) => {
                expect(res.status).toBe(200);

                const bodyToken = JSON.parse(res.text);

                // Set token value
                let token = bodyToken.token;

                expect(token).toBeDefined();
            });
        });
    });
});