import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'mongoose';
import { DatabaseService } from '../database/database.service';
import { AppModule } from '../app.module';
import { pollutionStub } from './__mocks__/stubs/pollution.stub';

describe('PollutionController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });

  it('/api/pollution (GET)', async () => {
    await dbConnection.collection('pollution').insertOne(pollutionStub());
    const response = await request(app.getHttpServer()).get('/api/pollution');
    expect(response.status).toBe(200);
    expect({
      aqicn: response.body[0].aqicn,
      aqius: response.body[0].aqius,
      maincn: response.body[0].maincn,
      mainus: response.body[0].mainus,
      ts: new Date(response.body[0].ts),
    }).toMatchObject(pollutionStub());
  });

  it('/api/pollution/max (GET)', async () => {
    await dbConnection.collection('pollution').insertOne(pollutionStub());
    const response = await request(app.getHttpServer()).get(
      '/api/pollution/max',
    );
    expect(response.status).toBe(200);
    expect({
      aqicn: response.body[0].aqicn,
      aqius: response.body[0].aqius,
      maincn: response.body[0].maincn,
      mainus: response.body[0].mainus,
      ts: new Date(response.body[0].ts),
    }).toMatchObject(pollutionStub());
  });

  it('/api/pollution (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/pollution')
      .send({
        lat: '48.856613',
        lon: '2.352222',
      });
    expect(response.status).toBe(201);
    expect(typeof response.body).toBe('object');
  });

  afterAll(async () => {
    await dbConnection.collection('pollution').deleteMany({});
    await app.close();
  });
});
