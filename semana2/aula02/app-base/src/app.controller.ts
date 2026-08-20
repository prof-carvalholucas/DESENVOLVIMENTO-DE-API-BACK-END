
import {Controller, Delete, Get, Post, Put } from "@nestjs/common"


@Controller("/ola")
export class AppController {


  @Get()
  getHello() {
    return 1 + 1;
  }

  @Post()
  postHello() {
    return { mensagem: 'Hello POST' };
  }

  @Put()
  putHello() {
    return { mensagem: 'Hello PUT' };
  }

  @Delete()
  deleteHello() {
    return { mensagem: 'Hello DELETE' };
  }
}
