import { IsEmail, IsNotEmpty } from 'class-validator'

export class UpdateUserEmailDto{
    @IsEmail({}, {
        message: 'Email is invalid format!',
    })
    @IsNotEmpty({
        message: 'Email is required!',
    })
    email: string;

    @IsNotEmpty({
        message: 'Password is required!',
    })
    password: string;
}