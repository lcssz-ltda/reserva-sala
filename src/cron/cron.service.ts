import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly usersService: UsersService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleListUsersCron() {
    this.logger.log('Executando cronjob para listar usuários...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Espera 10 segundos
      const users = await this.usersService.getUsers();
      this.logger.log(`Cronjob executado com sucesso! Total de usuários encontrados: ${users.length}`);
      this.logger.debug('Usuários encontrados:', users);
    } catch (error) {
      this.logger.error('Erro ao executar cronjob de listagem de usuários:', error);
    }
  }
} 