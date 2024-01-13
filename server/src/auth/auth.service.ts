import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    console.log('password', password);
    console.log('user.password', user.password);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    console.log(
      `[AuthService] validateUser: email=${username}, password=${password}`,
    );
    const user = await this.usersService.findOne(username);

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(createUserDto);
  }
}
