import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ApiKeyAuthModule } from './api-key-auth/api-key-auth.module';
import { ApiKeyGuard } from './api-key-auth/api-key/api-key.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [UsersModule, RoomsModule, ReservationsModule, ApiKeyAuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, // Use o token APP_GUARD
    useClass: ApiKeyGuard, // Especifique seu ApiKeyGuard
  }],
})
export class AppModule {}



