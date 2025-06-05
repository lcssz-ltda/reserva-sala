import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { TUser } from "./types";
import { userDb } from "./repository/mock.repository";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
    createUserMock(user: Omit<TUser, 'user_id'>): TUser {
        const newUser = {
            user_id: crypto.randomUUID(),
            name: user.name,
            email: user.email,
        };

        const user_exists = userDb.find((user) => user.email === user.email);
        if (user_exists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        

        userDb.push(newUser);
        return newUser;




    }

    async createUser(user: Omit<TUser, 'user_id'>): Promise<TUser> {
        const user_exists = await this.prisma.users.findUnique({
            where: {
                email: user.email,
            },
        });
        
        if (user_exists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }


        const newUser = await this.prisma.users.create({
            data: {
                name: user.name,
                email: user.email,
            },
        });

        return newUser;
        
    }

    getUsersMock(): TUser[] {
        return userDb;
    }

    async getUsers(): Promise<TUser[]> {
        const users = await this.prisma.users.findMany();
        return users;
    }



    getUserMock(id: string): TUser {
        const user = userDb.find((user) => user.user_id === id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async getUser(id: string): Promise<TUser> {
        const user = await this.prisma.users.findUnique({
            where: {
                user_id: id,
            },
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }






    getUserMailMock(email: string): TUser {
        const user = userDb.find((user) => user.email === email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async getUserMail(email: string): Promise<TUser> {
        const user = await this.prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }


}



