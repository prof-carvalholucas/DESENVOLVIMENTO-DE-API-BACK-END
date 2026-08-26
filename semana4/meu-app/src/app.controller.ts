import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//Zoom geral: Use Ctrl + + para aumentar e Ctrl + -| para diminuir toda a tela.

@Controller("app")
export class AppController {
  

  @Get()
  getStatus(): string {
    return "olá mundo";
  }
}
