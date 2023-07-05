import { IsEmail, Matches, IsNotEmpty } from 'class-validator'

export class CreateUserRequestDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, {
      message: 'Password must contain at least one uppercase letter, letters, and numbers',
    })
    @IsNotEmpty()
    password: string;
}