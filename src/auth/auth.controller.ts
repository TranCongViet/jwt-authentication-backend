import { Controller, Post, Body, UnauthorizedException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }
    const data = await this.authService.login(user);
    if (data) 
      return {
      statusCode: HttpStatus.OK,
      message: 'Successfull login, please wait 2s for redirect to home page',
      accesstoken: data.access_token,
      user: data.user,
    }
    else {
      throw new InternalServerErrorException('Login failed, please try again later');
    }
  }
}