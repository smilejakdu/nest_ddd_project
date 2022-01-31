import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'http-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
	});
	const port = process.env.PORT || 3000;

	const config = new DocumentBuilder()
		.setTitle('Nest DDD')
		.setDescription('Nest DDD User Board Comment')
		.setVersion('1.0')
		.addBearerAuth({ type: 'http', scheme: 'Bearer', bearerFormat: 'Token', in: 'header' }, 'access-token')
		.addTag('Nest DDD')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new HttpExceptionFilter());
	app.enableCors();

	await app.listen(port);
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then(() => console.log('Start Server'));
