import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto, EditTodoDto } from './dto/todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) { }

  // Create new Todo 
  async createTodo(userId: string, todo: CreateTodoDto): Promise<Todo> {

    const newTodo = await this.todoModel.create({
      name: todo.name,
      status: todo.status,
      content: todo.content,
      category: todo.category,
      author: userId,
      createdDate: todo.createdDate,
    });
    return newTodo.save();
  }

  // Find all Todo list
  async findAllTodos(): Promise<Todo[]> {
    return await this.todoModel.find().exec();
  }

  // Edit Todo 
  async editTodo(userId: string, todoId: string, editTodo: EditTodoDto): Promise<Todo> {
    
    /** Find Todo by Id then check that userId is the same as author and finally update Todo **/
    const todo = await this.todoModel.findById(todoId).populate('author')
    if (userId === todo.author['id']) {
      const updateTodo = await this.todoModel.findByIdAndUpdate(todoId, editTodo).exec();
      return updateTodo;
    }
  }

  // Delete Todo
  async deleteTodo(userId: string, todoId: string): Promise<any> {
    /** Find Todo by Id then check that userId is the same as author and finally delete Todo **/
    const todo = await this.todoModel.findById(todoId).populate('author')
    if (userId === todo.author['id']) {
      return await this.todoModel.findByIdAndDelete(todoId).exec();
    }
  }

}