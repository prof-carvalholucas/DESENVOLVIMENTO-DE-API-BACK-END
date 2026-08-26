import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getStatus(): string {
    return 'API meu-app em execução. Implemente Controller e Service de Usuario e Funcionario.';
  }
}
