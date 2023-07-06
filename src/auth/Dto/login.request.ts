import { IsNotEmpty, Matches, IsEmail } from 'class-validator'

export class Login {
    @IsEmail({}, {
      message: 'Invalid email'
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
  