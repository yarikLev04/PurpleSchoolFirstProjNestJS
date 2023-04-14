import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDTO: AuthDto = {
	login: 'a123@a1.com',
	password: '123456',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDTO)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - wrong email', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDTO, login: 'faik@a1.com' } as AuthDto)
			.expect(401, {
				statusCode: 401,
				message: 'User not found',
				error: 'Unauthorized',
			});
	});

	it('/auth/login (POST) - wrong password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDTO, password: '2' } as AuthDto)
			.expect(401, {
				statusCode: 401,
				message: 'Wrong password',
				error: 'Unauthorized',
			});
	});

	afterAll(() => {
		disconnect();
	});
});
