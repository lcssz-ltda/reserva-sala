import { Controller, Get, Param, Post, Query, Body } from "@nestjs/common";
import { TUser } from "./types";
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get()
    async getUsers(): Promise<TUser[]> {
        return await this.usersService.getUsers();
    }


    @Get('/find')
    async getUserMail(@Query('email') email: string): Promise<TUser> {
        console.log("rota do email", email);
        return await this.usersService.getUserMail(email);
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<TUser> {
        console.log("rota do ID", id);
        return await this.usersService.getUser(id);
    }

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<TUser> {
        return await this.usersService.createUser(user);
    }
    
}
