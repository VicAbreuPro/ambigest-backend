import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoverUserPasswordDto{
    @IsEmail({}, {
        message: 'Email is invalid format!',
    })
    @IsNotEmpty({
        message: 'Email is required!',
    })
    email: string;
}