import { IsNotEmpty, Matches, IsEmail } from 'class-validator'

export class Login {
    @IsEmail({}, {
      message: 'Invalid email'
    })
    email: string;
  
    @IsNotEmpty({
      message: 'Password is required!',
    })
    password: string;
  }
  