import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nick: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string
}

export default CreateUserDto;