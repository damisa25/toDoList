import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
//import { UserSchema } from '../users/schemas/user.schema';

export type TodoDocument = Todo & mongoose.Document;

@Schema()
export class Todo {

  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  content: string;

  @Prop()
  category: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'}) //Foreign Key
  author: {};

  @Prop()
  createdDate: Date;

}

export const TodoSchema = SchemaFactory.createForClass(Todo);