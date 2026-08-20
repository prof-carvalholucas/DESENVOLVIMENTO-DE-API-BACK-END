import { Body, Controller,Get, Param, Post } from "@nestjs/common";
import { stringify } from "querystring";

@Controller("/calc")
export class   CalcController{

   
    @Get("nome/:nome")
    public iprimir(@Param("nome") nome){
        return "Olá, " + nome;
    }

    
}