import { Injectable } from "@nestjs/common";
import { roomDb } from "./repository/mock.repository";
import { TRoom } from "./types";



@Injectable()
export class RoomsService {
    constructor() { }

   createRoom(room: Omit<TRoom, 'room_id'>): TRoom {
    const newRoom = {
        room_id: crypto.randomUUID(),
        name: room.name,
        location: room.location,
    };
    roomDb.push(newRoom);
    return newRoom;
   }



    getRooms(): TRoom[] {
        return roomDb;
    }












}

