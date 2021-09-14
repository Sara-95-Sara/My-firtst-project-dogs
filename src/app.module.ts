import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [DatabaseModule, DogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
