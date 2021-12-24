export class AuthUserDto {
    readonly username: string;
    readonly password: string;
    readonly id: string;
    readonly firstname: string;
    readonly lastname: string;
  }

export class AuthLoginDto {
    readonly username: string;
  }