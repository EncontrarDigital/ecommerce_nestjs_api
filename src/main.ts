import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RedocModule } from 'nestjs-redoc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  if (configService.get('nodeEnv') === 'development') {
    app.enableCors({ origin: true, credentials: true });
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-commerce platform API')
    .setVersion(process.env.npm_package_version ?? '1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  await RedocModule.setup('docs', app, document, {});

  const PORT = process.env.PORT || 80;
  await app.listen(PORT, '0.0.0.0'); // Apenas esta linha

  console.log(`App running on port ${PORT}`);
}
bootstrap();
