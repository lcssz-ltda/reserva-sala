import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key/api-key.service';
import { ApiKeyGuard } from './api-key/api-key.guard'
@Module({
  providers: [ApiKeyService, ApiKeyGuard],
  exports: [ApiKeyService, ApiKeyGuard], // Exporte para que outros módulos possam usá-los
})
export class ApiKeyAuthModule {}
