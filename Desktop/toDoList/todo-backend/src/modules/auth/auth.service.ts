import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth.dto'
import { User } from '../users/schemas/user.schema'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    //console.log(user);
    
    const payload = { username: user.username};
    return {
        userId: user['id'],
        username: user.username,
        access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { username }= authLoginDto
    const user = await this.usersService.findOneUser(username);
    // comparing username with password generated from hashing
    const isMatch = await bcrypt.compare(username, user.password);
    if (user && isMatch) {
      return user
    }
    return null;
  }

}