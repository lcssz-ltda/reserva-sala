import { Controller, Get, Param, Post, Query, Body } from "@nestjs/common";
import { TUser } from "./types";
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get()
    getUsers(): TUser[] {
        return this.usersService.getUsers();
    }


    @Get('/find')
    getUserMail(@Query('email') email: string): TUser {
        console.log("rota do email", email);
        return this.usersService.getUserMail(email);
    }

    @Get(':id')
    getUser(@Param('id') id: string): TUser {
        console.log("rota do ID", id);
        return this.usersService.getUser(id);
    }

    @Post()
    createUser(@Body() user: CreateUserDto): TUser {
        return this.usersService.createUser(user);
    }
    
}
