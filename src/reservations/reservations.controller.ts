import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/reservations.dto";
import { TGetReservations, TReservation } from "./types";
import { TRoom } from "src/rooms/types";





@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    
    
    @Get('available-rooms')
    async getAvailableRooms(): Promise<TRoom[]> {
        return await this.reservationsService.getAvailableRooms()
    }


    @Get(':user_id')
    async getReservationsByUserId(@Param('user_id') user_id: string): Promise<TReservation[]> {
        return await this.reservationsService.getReservationsByUserId(user_id)
     
        
    }
    @Get(':room_id')
    async getReservationsByRoomId(@Param('room_id') room_id: string): Promise<TReservation[]> {
        return await this.reservationsService.getReservationsByRoomId(room_id)
    }

    @Get()
    async getReservations(@Query('user_id') user_id: string, @Query('room_id') room_id: string): Promise<TReservation[]> {
        const filters: TGetReservations = {
            user_id,
            room_id
        }
        return this.reservationsService.getReservations(filters)
    }


    @Post()
    async createReservation(@Body() reservation: CreateReservationDto): Promise<TReservation> {
        console.log(reservation);

        const response = await this.reservationsService.createReservation(reservation);
        
        return response;
    }
    


}

