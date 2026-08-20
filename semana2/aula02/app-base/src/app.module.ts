import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CalcController } from './calc.controller';
import { CatsController } from './cats.controller';
import { CatService } from './cat.service';

/**
 * Módulo raiz da aplicação.
 */
@Module({
  imports: [CatService],
  controllers: [
    AppController,
    CalcController, 
    CatsController],
  providers: [AppService],
})
export class AppModule {}
