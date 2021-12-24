import { Controller, Req, Res,Post, HttpStatus, BadRequestException, } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // Api for login and get access token
  @Post('auth/login')
  async login(@Req() req, @Res() res) {
    try {
      const result = await this.authService.login(req.body);
      return res.status(HttpStatus.OK).json(result);

    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.toString());
    }
  }

}