import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './Jwt/jwt.stratagy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import constant from 'src/constant';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: constant.SECRET_KEY,
      signOptions: { expiresIn: '36000s' },
    }),
    PassportModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
