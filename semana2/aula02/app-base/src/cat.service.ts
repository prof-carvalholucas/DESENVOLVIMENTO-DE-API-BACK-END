import { Injectable } from "@nestjs/common";
import { Cat } from "./cat";

@Injectable()
export class CatService{

    public cadastra(cat: Cat) {
     console.table(cat)
    }
}