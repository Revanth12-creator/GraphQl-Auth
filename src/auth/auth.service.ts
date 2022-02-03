import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateAuthInput, JwtUser } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
import constant from 'src/constant';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: CreateAuthInput) {
    let { email, password } = login;
    let user = await this.userService.findUser(email);
    if (!user) {
      throw new HttpException({ message: 'Email Not Found' }, 401);
    }
    
    const isVerified = await bcrypt.compare(password,user.password);
    if (!isVerified) {
      throw new HttpException({ message: 'Invalid login details' }, 401);
    }

    return user;
  }

  async loginUser(login: CreateAuthInput) {
    let user = await this.validateUser(login);
    let payload = { sub: user.email, id: user.userId };
    let token = await this.jwtService.sign(payload);

    let userData: JwtUser = {
      token: token,
      userId: user.userId,
      name: user.name,
      email: user.email,
    };
    console.log(userData);
    return userData;
  }

  create(createAuthInput: CreateAuthInput) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
