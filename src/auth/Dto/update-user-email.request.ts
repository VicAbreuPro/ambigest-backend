import { IsEmail, IsNotEmpty } from 'class-validator'

export class UpdateUserEmailDto{
    @IsEmail({}, {
        message: 'Email is invalid format!',
    })
    email: string;

    @IsNotEmpty({
        message: 'Password is required!',
    })
    password: string;
}