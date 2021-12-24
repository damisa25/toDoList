import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }
  
  // Create new user function
  async createUser(user: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    // using hash to generate password from username
    const createdpassword = await bcrypt.hash(user.username, saltOrRounds);
    const newUser = await this.userModel.create({
      username: user.username,
      password: createdpassword,
      firstname: user.firstname,
      lastname: user.lastname
    });
    return newUser.save();
  }

  // Find users function
  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // Find one user function
  async findOneUser(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username }).exec();
  }
}