export type TReservation = {
    reservation_id: string;
    room_id: string;
    user_id: string;
    initial_date: Date;
    final_date: Date;
    
    

    
}

export type TCreateReservation = {
    room_id: string;
    user_id: string;
    time_use: number;
}

export type TGetReservations = {
    user_id?: string;
    room_id?: string;
}
