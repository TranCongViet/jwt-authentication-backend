import { Controller, Post, Request, Get, Body, BadRequestException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from '../dto/register.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: RegisterDto) {
    const user = await this.userService.register(createUserDto);
    if (!user) {
      throw new BadRequestException('Email exists');
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successful registration, please wait 2s for redirect to login page',
      data: user,
    };
  }

  @Get('profile')
  getProfile(@Request() req) {
    if(req.user) {
        return {
            statusCode: HttpStatus.OK,
            Message: 'Get profile success',
            user: req.user,
        }
    }
    else {
        throw new BadRequestException('Invalid token');
    }
  }
}