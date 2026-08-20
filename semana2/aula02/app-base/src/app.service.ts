import { Injectable } from '@nestjs/common';

/**
 * Serviço raiz — mensagens simples de hello por método.
 * Usando @Injectable()
 */

export class AppService {
  getHello() {
    return { mensagem: 'Hello GET' };
  }

  postHello() {
    return { mensagem: 'Hello POST' };
  }

  putHello() {
    return { mensagem: 'Hello PUT' };
  }

  deleteHello() {
    return { mensagem: 'Hello DELETE' };
  }
}
