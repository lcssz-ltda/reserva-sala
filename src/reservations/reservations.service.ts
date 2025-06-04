import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TCreateReservation, TGetReservations, TReservation } from "./types";
import { reservationsDb } from "./repository/mock.repository";
import { roomDb } from "src/rooms/repository/mock.repository";
import { TRoom } from "src/rooms/types";
import { userDb } from "src/users/repository/mock.repository";






@Injectable()
export class ReservationsService {
    constructor() { }


    getAvailableRooms(): TRoom[] {
        const ms_in_minute = 60000;
        const now = new Date();
        const local_offset = now.getTimezoneOffset() * ms_in_minute;

        const actualDate = new Date(Date.now() - local_offset);
        const initial_date = new Date(actualDate);

        const availableRooms = roomDb.filter(room => {
            const room_has_reservation = reservationsDb.find(reservation => reservation.final_date >= initial_date &&
                reservation.room_id === room.room_id);

            if (room_has_reservation) {
                return false;
            }
            return true;

        })
        return availableRooms;
    }


    createReservation(reservation: TCreateReservation): TReservation {


        const user_exists = userDb.find(user => user.user_id === reservation.user_id);
        if (!user_exists) {
            throw new NotFoundException('User not found');
        }

        const room_exists = roomDb.find(room => room.room_id === reservation.room_id);
        if (!room_exists) {
            throw new NotFoundException('Room not found');
        }

        if (reservation.time_use <= 0) {
            throw new BadRequestException('time_use must be greater than 0');
        }

        const ms_in_minute = 60000;
        const now = new Date();
        const local_offset = now.getTimezoneOffset() * ms_in_minute;

        const actualDate = new Date(Date.now() - local_offset);
        const initial_date = new Date(actualDate);
        const final_date = new Date(actualDate.getTime() + reservation.time_use * ms_in_minute);


        const response = {
            reservation_id: crypto.randomUUID(),
            room_id: reservation.room_id,
            user_id: reservation.user_id,
            initial_date: initial_date,
            final_date: final_date
        }



        const user_has_reservation = reservationsDb.find(reservation => reservation.final_date >= response.initial_date &&
            reservation.user_id === response.user_id);

        if (user_has_reservation) {
            throw new BadRequestException('User already has a reservation');
        }

        const room_has_reservation = reservationsDb.find(reservation => reservation.final_date >= response.initial_date &&
            reservation.room_id === response.room_id);

        if (room_has_reservation) {
            throw new BadRequestException('Room already has a reservation');
        }


        reservationsDb.push(response);



        return response;
    }

    getReservations(filters: TGetReservations): TReservation[] {
        const response = reservationsDb.filter(reservation => {
            if (filters.user_id && reservation.user_id !== filters.user_id) {
                return false;
            }
            if (filters.room_id && reservation.room_id !== filters.room_id) {
                return false;
            }
            return true;
        })
        if (!response) {
            return reservationsDb;
        }
        return response;
    }

    getReservationsByUserId(user_id: string): TReservation[] {
        const response = reservationsDb.filter(reservation => reservation.user_id === user_id)
        if (!response) {
            throw new NotFoundException('Reservation not found');
        }
        return response;
    }

    getReservationsByRoomId(room_id: string): TReservation[] {
        const response = reservationsDb.filter(reservation => reservation.room_id === room_id)
        if (!response) {
            throw new NotFoundException('Reservation not found');
        }
        return response;
    }

}

