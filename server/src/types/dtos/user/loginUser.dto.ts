import { IsNotEmpty, IsString } from "class-validator";

class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;
}

export default LoginUserDto;
