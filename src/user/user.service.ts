import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserInput: CreateUserInput) {
    let { name, email } = createUserInput;
    let password = '12345';

    let isUserAvailable = await this.findUser(email);
    if (isUserAvailable) {
      throw new HttpException({ message: 'User already exists' }, 400);
    }
    let pwd = await this.hashPassword(password);

    let user = {
      name: name,
      email: email,
      password: pwd,
    };
    let createuser = await this.userRepository.create(user);

    try {
      return this.userRepository.save(createuser);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
