import { Controller, Post, Body, Get } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { TRoom } from "./types";



@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Get()
    async getRooms(): Promise<TRoom[]> {
        return await this.roomsService.getRooms();
    }


    @Post()
    async createRoom(@Body() room: CreateRoomDto): Promise<TRoom> {
        return await this.roomsService.createRoom(room);
    }
    
    

}


