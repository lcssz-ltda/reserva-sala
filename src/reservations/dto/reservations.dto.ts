import { IsNotEmpty, IsNumber, IsString } from "class-validator";




export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
    room_id: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsNumber()
    @IsNotEmpty()
    time_use: number;
    
   
    
}
