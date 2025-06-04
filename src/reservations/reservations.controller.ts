import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/reservations.dto";
import { TGetReservations, TReservation } from "./types";
import { TRoom } from "src/rooms/types";





@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    
    
    @Get('available-rooms')
    getAvailableRooms(): TRoom[] {
        return this.reservationsService.getAvailableRooms()
    }


    @Get(':user_id')
    getReservationsByUserId(@Param('user_id') user_id: string): TReservation[] {
        return this.reservationsService.getReservationsByUserId(user_id)
     
        
    }
    @Get(':room_id')
    getReservationsByRoomId(@Param('room_id') room_id: string): TReservation[] {
        return this.reservationsService.getReservationsByRoomId(room_id)
    }

    @Get()
    getReservations(@Query('user_id') user_id: string, @Query('room_id') room_id: string): TReservation[] {
        const filters: TGetReservations = {
            user_id,
            room_id
        }
        return this.reservationsService.getReservations(filters)
    }


    @Post()
    createReservation(@Body() reservation: CreateReservationDto): TReservation {
        console.log(reservation);

        const response = this.reservationsService.createReservation(reservation);
        
        return response;
    }
    


}

