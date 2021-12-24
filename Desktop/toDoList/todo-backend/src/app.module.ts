import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { modules } from './modules/index'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/todoDB'),
  ...modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
