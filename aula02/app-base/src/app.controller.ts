import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controller raiz — um "hello" para cada método HTTP.
 * Exercício 1: só entender GET, POST, PUT e DELETE.
 * usando @Controller() e @Get(), @Post(), @Put() e @Delete()
 */

@Controller()
export class AppController {
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
