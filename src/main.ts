import * as dotenv from 'dotenv';
dotenv.config(); // .env dosyasını yükler

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import * as cookieParser from 'cookie-parser'; // ✅ burası eklendi

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const root = process.cwd();

  app.useStaticAssets(join(root, 'public'));
  app.setBaseViewsDir(join(root, 'views'));
  hbs.registerPartials(join(root, 'views', 'layouts'));
  app.setViewEngine('hbs');

  app.use(cookieParser()); //  burası eklendi

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
