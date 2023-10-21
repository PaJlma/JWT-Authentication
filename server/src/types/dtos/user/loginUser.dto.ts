import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

class LoginUserDto {
  @ApiProperty({
    description: "Электронный почтовый адрес",
    example: "example@gmail.com",
    required: true,
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;
  
  @ApiProperty({
    description: "Пароль пользователя",
    example: "123456",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export default LoginUserDto;
