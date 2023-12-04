import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { WasteCollectionEntity } from 'src/WasteCollection/Entities/waste-collection.entity';
import { UserEntity } from 'src/User/models/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ValidationPipe } from '@nestjs/common';

describe('WasteCollectionController', () => {
  let app: any;
  let token: string;
  let wasteCollectionRepository: Repository<WasteCollectionEntity>;
  let userCollectionRepositry: Repository<UserEntity>;
  let user: UserEntity;

  const loginData = {
    email: 'victor.abreu09@gmail.com',
    password: 'Ambigest123',
  };

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

    // Initialize necessary repositories for test auxiliary
    wasteCollectionRepository = app.get(getRepositoryToken(WasteCollectionEntity));
    userCollectionRepositry = app.get(getRepositoryToken(UserEntity));

    // Get the user for insert the userId in the necessary tests
    user = await userCollectionRepositry.findOne({ where: {email : loginData.email }});

    // Get auth token form Login method and Firebase
    const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send(loginData)
    .set('Content-Type', 'application/json')

    const body = JSON.parse(response.text);
    
    // Set token value
    token = body.token;
  });

  // Delete all waste-collection entities after all the tests to maintain the test databse integrity
  afterAll(async () => {
    await wasteCollectionRepository.delete({});

    // Close all conections from test app
    await app.close();
  });

  describe('GET /waste-collection', () => {
    it('should return a Unauthorized code when the token is invalid', async () => {
      // Call GET method
      const response = await request(app.getHttpServer())
      .get('/waste-collection')
      .set('Authorization', `Bearer token`)

      expect(response.status).toBe(401)
    });

    it('should return a list of user waste-collection', async () => {
      // Set auxiliary variables
      const dateToInsert1 = new Date('2023-02-26');
      const dateToInsert2 = new Date('2023-02-27');
      const now = new Date();

      // Set all the entity to insert for this test purpose only
      const wasteCollections: WasteCollectionEntity[] = [
        {
          _id: new ObjectId(),
          userId: user._id.toString(),
          type: 'recolha de resíduos de vidro',
          latitude: 41.527953219586394,
          longitude: -8.6296646711644,
          pickup_at : dateToInsert1,
          time_of_day: 'tarde',
          created_at: now,
          updated_at: now
        },
        {
          _id: new ObjectId(),
          userId: user._id.toString(),
          type: 'recolha de resíduos de metal',
          latitude: 41.527953219586394,
          longitude: -8.6296646711644,
          pickup_at : dateToInsert2,
          time_of_day: 'tarde',
          created_at: now,
          updated_at: now
        }
      ];

      // Insert created entities
      await wasteCollectionRepository.save(wasteCollections);

      // Call GET method
      const response = await request(app.getHttpServer())
      .get('/waste-collection')
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => {
        const receivedData = res.body;

        const filteredReceivedData = receivedData.map((item: any) => {
          const { pickup_at, ...rest } = item;
          const parsedDate = pickup_at ? new Date(pickup_at) : null;
          return {
            ...rest,
            pickup_at: parsedDate,
          };
        });

        const filteredExpectedData = wasteCollections.map((item: any) => {
          const { created_at, updated_at, userId, _id, ...rest } = item;
          return {
            ...rest,
            _id: _id.toString()
          }
        });

        expect(res.status).toBe(200);
        expect(filteredReceivedData).toEqual(filteredExpectedData);
      });
    })
  });

  describe('POST /waste-collection', () => {
    it('should return a unauthorized code when the token invalid', async () => {
      const response = await request(app.getHttpServer())
      .post('/waste-collection')
      .set('Authorization', `Bearer token`)
      .set('Content-Type', 'application/json')
      .send({})

      expect(response.status).toBe(401);
    });
    
    it('should return a bad request code when the object to update is not valid', async () => {
      const wasteCollectionWithoutType = {
        latitude: '41.527953219586394',
        longitude: '-8.6296646711644',
        pickup_at :'2023-05-30',
        time_of_day: 'tarde'
      };

      const response = await request(app.getHttpServer())
      .post('/waste-collection')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(wasteCollectionWithoutType)

      expect(response.status).toBe(400);
    });

    it('should create a waste-collection', async () => {
      const wasteCollection = {
        type: 'recolha de resíduos de vidro test',
        latitude: '41.527953219586394',
        longitude: '-8.6296646711644',
        pickup_at :'2023-06-30',
        time_of_day: 'tarde'
      };

      const response = await request(app.getHttpServer())
      .post('/waste-collection')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(wasteCollection)
      .expect((res) => {
        const { _id, ...bodyWithoutId } = res.body;

        expect(res.status).toBe(201);
        expect(bodyWithoutId).toEqual(wasteCollection);
      });
    })
  });

  describe('PUT /waste-collection', () => {
    it('should return a unauthorized code when the token invalid', async () => {
      const response = await request(app.getHttpServer())
      .put('/waste-collection')
      .set('Authorization', `Bearer token`)
      .set('Content-Type', 'application/json')
      .send({})

      expect(response.status).toBe(401);
    });
    
    it('should return a bad request code when try to update an invalid object', async () => {
      const wasteCollectionWithoutId= {
        type: 'recolha de resíduos de vidro test',
        latitude: '41.527953219586394',
        longitude: '-8.6296646711644',
        pickup_at :'2023-05-30',
        time_of_day: 'tarde'
      };

      const response = await request(app.getHttpServer())
      .put('/waste-collection')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(wasteCollectionWithoutId)

      expect(response.status).toBe(400);
    });

    it('should update a waste-collection', async () => {
      const dateToInsert = new Date('2023-08-27');
      const now = new Date();

      const wasteCollectionToUpdate: WasteCollectionEntity = {
        _id: new ObjectId(),
        userId: user._id.toString(),
        type: 'recolha de resíduos de vidro test',
        latitude: 41.527953219586394,
        longitude: -8.6296646711644,
        pickup_at :dateToInsert,
        time_of_day: 'tarde',
        created_at: now,
        updated_at: now
      };

      const inserted = await wasteCollectionRepository.save(wasteCollectionToUpdate);

      const wasteCollectionUpdated = {
        id: inserted._id.toString(),
        userId: user._id.toString(),
        type: 'Updated Type',
        latitude: 41.527953219586394,
        longitude: -8.6296646711644,
        pickup_at :dateToInsert,
        time_of_day: 'manha',
        created_at: now,
        updated_at: now
      };

      await request(app.getHttpServer())
      .put('/waste-collection')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(wasteCollectionUpdated)
      .expect((res) => {
        expect(res.body._id).toBe(inserted._id.toString());
        expect(res.body.type).toBe(wasteCollectionUpdated.type);
        expect(res.status).toBe(200);
      });
    })
  });

  describe('DELETE /waste-collection', () => {
    it('should return a unauthorized code when the token invalid', async () => {
      const response = await request(app.getHttpServer())
      .post('/waste-collection')
      .set('Authorization', `Bearer token`)

      expect(response.status).toBe(401);
    });
    
    it('should return a bad request code when the object id is not supplied', async () => {
      const response = await request(app.getHttpServer())
      .delete('/waste-collection?id=')
      .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(400);
    });

    it('should delete a waste-collection', async () => {
      const dateToInsert = new Date('2023-08-27');
      const now = new Date();

      const wasteCollectionToDelete: WasteCollectionEntity = {
        _id: new ObjectId(),
        userId: user._id.toString(),
        type: 'recolha de resíduos de vidro test',
        latitude: 41.527953219586394,
        longitude: -8.6296646711644,
        pickup_at :dateToInsert,
        time_of_day: 'tarde',
        created_at: now,
        updated_at: now
      };

      const inserted = await wasteCollectionRepository.save(wasteCollectionToDelete);

      const response = await request(app.getHttpServer())
      .delete('/waste-collection?id=' + inserted._id.toString())
      .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(204);

      const responseGet = await request(app.getHttpServer())
      .get('/waste-collection/detail?id=' + inserted._id.toString())
      .set('Authorization', `Bearer ${token}`)

      expect(responseGet.status).toBe(404);
    })
  });
});