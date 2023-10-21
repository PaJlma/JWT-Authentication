import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

class CreateUserDto {
  @ApiProperty({
    description: "Псевдоним пользователя",
    example: "PaJlma",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  nick: string;

  @ApiProperty({
    description: "Электронный почтовый адрес",
    example: "example@gmail.com",
    required: true,
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Пароль пользователя",
    example: "123456",
    minLength: 6,
    maxLength: 25,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string
}

export default CreateUserDto;