import { CatService } from './cat.service';
import { Body, Controller, Post } from "@nestjs/common";
import { Cat } from "./cat";

@Controller("cats")
export class CatsController{

  constructor(catService:CatService){

  }
    @Post()
    public cadastrar(@Body() cat : Cat){
       this.c
      return "Olá"
    }
}