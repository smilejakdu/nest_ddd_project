import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'http-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 3000;

	const config = new DocumentBuilder()
		.setTitle('Nest DDD')
		.setDescription('Nest DDD User Board Comment')
		.setVersion('1.0')
		.addTag('Nest DDD')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new HttpExceptionFilter());
	app.enableCors();

	await app.listen(port);
	console.log(`listening on port ${port}`);
}

bootstrap().then(() => console.log('Start Server'));
