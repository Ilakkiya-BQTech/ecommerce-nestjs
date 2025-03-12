import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Post('register')
    async  register(@Body('username') username:string,@Body('password') password:string):Promise<User>{
        const existingUser= await this.usersService.findOne(username);
        if(existingUser){
            throw new NotFoundException('user already exists')
        }
        return this.usersService.create(username,password)
    }
}
