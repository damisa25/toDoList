import { Body, Controller, Get, Post, UseGuards, HttpStatus, BadRequestException, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Api for crating new user
  @Post()
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return res.status(HttpStatus.OK).json(newUser);

    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.toString());
    }
  }

  // Api for finding all users
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.usersService.findAllUsers();
  }
  
}