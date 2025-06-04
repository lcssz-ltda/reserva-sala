import { Controller, Post, Body, Get } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { TRoom } from "./types";



@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Get()
    getRooms(): TRoom[] {
        return this.roomsService.getRooms();
    }


    @Post()
    createRoom(@Body() room: CreateRoomDto): TRoom {
        return this.roomsService.createRoom(room);
    }
    
    

}


