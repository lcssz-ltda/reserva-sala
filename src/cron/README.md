# Cronjob de Listagem de Usuários

## Descrição
Este módulo implementa um cronjob que executa automaticamente a cada 1 minuto para listar todos os usuários da base de dados.

## Funcionalidades

### CronService
- **Execução**: A cada 1 minuto (`CronExpression.EVERY_MINUTE`)
- **Função**: `handleListUsersCron()`
- **Comportamento**: 
  - Lista todos os usuários da base de dados
  - Registra logs informativos sobre a execução
  - Trata erros graciosamente sem interromper a aplicação

## Características

### Assíncrono
- O cronjob roda de forma assíncrona
- Não bloqueia outras requisições da aplicação
- Utiliza `async/await` para operações não-bloqueantes

### Logging
- Logs informativos sobre início da execução
- Contagem de usuários encontrados
- Logs de debug com detalhes dos usuários
- Tratamento de erros com logs de erro

### Tratamento de Erros
- Try/catch para capturar exceções
- Logs de erro sem interromper a aplicação
- Continuação normal do funcionamento mesmo em caso de falha

## Configuração

O cronjob é automaticamente ativado quando a aplicação inicia, através da importação do `CronModule` no `AppModule`.

## Logs Esperados

```
[2024-01-01 12:00:00] [CronService] Executando cronjob para listar usuários...
[2024-01-01 12:00:00] [CronService] Cronjob executado com sucesso! Total de usuários encontrados: 5
```

## Modificação da Frequência

Para alterar a frequência de execução, modifique o decorator `@Cron()` no método `handleListUsersCron()`:

```typescript
// A cada 30 segundos
@Cron('*/30 * * * * *')

// A cada 5 minutos
@Cron('0 */5 * * * *')

// A cada hora
@Cron(CronExpression.EVERY_HOUR)
``` 