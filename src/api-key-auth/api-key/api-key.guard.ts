
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { Request } from 'express'; // Importe Request se estiver usando express

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.headers["authorization"] as string; // Ou 'authorization', etc.

    return this.apiKeyService.validateApiKey(apiKey);
  }
}

