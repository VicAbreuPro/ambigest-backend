import { IsNotEmpty, Matches } from 'class-validator'

export class Login {
    @IsNotEmpty({
      message: 'Email is required!',
    })
    email: string;
  
    @IsNotEmpty({
      message: 'Password is required!',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, {
      message: 'Invalid Password, please reset it',
    })
    password: string;
  }
  