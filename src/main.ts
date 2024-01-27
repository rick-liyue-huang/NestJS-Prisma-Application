import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, () => {
    console.log(
      `Listening on port ${PORT} 🚀 with the mode of ${process.env.NODE_ENV}`
    );
  });
}
bootstrap();
