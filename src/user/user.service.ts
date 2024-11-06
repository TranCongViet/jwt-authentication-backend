import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password } = registerDto;
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      return null; 
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ email, password: hashedPassword });
    return this.usersRepository.save(newUser);
  }
}