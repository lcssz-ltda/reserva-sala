// src/api-key-auth/api-key.service.ts
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyService {
  
  private validApiKey: string|undefined = process.env.API_KEY;
    
  async validateApiKey(apiKey: string): Promise<boolean> {
    if (!this.validApiKey){
        throw new InternalServerErrorException();
    }
    if (!apiKey) {
      throw new UnauthorizedException('API Key is missing');
    }
    const isValid = this.validApiKey===apiKey;
    if (!isValid) {
      throw new UnauthorizedException('Invalid API Key');
    }
    return true;
  }
}
