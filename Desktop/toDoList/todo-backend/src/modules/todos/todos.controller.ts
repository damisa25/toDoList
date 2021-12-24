import { Body, Controller, Get, Post, UseGuards, Param, Res, Patch, Delete, HttpStatus, BadRequestException, } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateTodoDto, EditTodoDto } from './dto/todo.dto';
import { Todo } from './schemas/todo.schema';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  // Api for crating new Todo block
  @Post('create/:userId')
  async createTodo(
    @Res() res,
    @Param('userId') userId: string,
    @Body() createTodoDto: CreateTodoDto) {
    try {
      const newTodo = await this.todosService.createTodo(userId, createTodoDto);
      return res.status(HttpStatus.OK).json(newTodo);

    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.toString());
    }
  }

  // Api for finding all todo lists
  @Get()
  async findAllTodos(): Promise<Todo[]> {
    return await this.todosService.findAllTodos();
  }

  // Api for editing Todo
  @Patch('edit/:userId/:todoId')
  async editProfile(
    @Res() res,
    @Param('userId') userId: string,
    @Param('todoId') todoId: string,
    @Body() editTodo: EditTodoDto,
  ) {
    try {
      const editedTodo = await this.todosService.editTodo(userId, todoId, editTodo);
      return res.status(HttpStatus.OK).json(editedTodo);

    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.toString());
    }
  }

  // Api for deleting Todo
  @Delete('delete/:userId/:todoId')
  async deleteEmployee(
    @Res() res,
    @Param('userId') userId: string,
    @Param('todoId') todoId: string) {
    try {
      const deletedTodo = await this.todosService.deleteTodo(userId, todoId);
      return res.status(HttpStatus.OK).json(deletedTodo);

    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.toString());
    }
  }
}