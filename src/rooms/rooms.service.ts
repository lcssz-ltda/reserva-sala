import { Injectable } from "@nestjs/common";
import { roomDb } from "./repository/mock.repository";
import { TRoom } from "./types";
import { PrismaService } from "src/database/prisma.service";



@Injectable()
export class RoomsService {
    constructor(private readonly prisma: PrismaService) { }

   createRoomMock(room: Omit<TRoom, 'room_id'>): TRoom {
    const newRoom = {
        room_id: crypto.randomUUID(),
        name: room.name,
        location: room.location,
    };
    roomDb.push(newRoom);
    return newRoom;
   }

   async createRoom(room: Omit<TRoom, 'room_id'>): Promise<TRoom> {
    const newRoom = await this.prisma.rooms.create({
        data: {
            name: room.name,
            location: room.location,
        },
    });

    return newRoom;
   }

   

    getRoomsMock(): TRoom[] {
        return roomDb;
    }
    

    async getRooms(): Promise<TRoom[]> {
        const rooms = await this.prisma.rooms.findMany();
        return rooms;
    }


    







}

