import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { TUser } from "./types";
import { userDb } from "./repository/mock.repository";

@Injectable()
export class UsersService {
    createUser(user: Omit<TUser, 'user_id'>): TUser {
        const newUser = {
            user_id: crypto.randomUUID(),
            name: user.name,
            email: user.email,
        };
        userDb.push(newUser);
        return newUser;




    }
    getUsers(): TUser[] {
        return userDb;
    }

    getUser(id: string): TUser {
        const user = userDb.find((user) => user.user_id === id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    getUserMail(email: string): TUser {
        const user = userDb.find((user) => user.email === email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }



}



