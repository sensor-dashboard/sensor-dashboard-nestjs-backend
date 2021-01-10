import { User } from '~modules/user/user.entity';

export class UserDto {
  public id: number;
  public username: string;
  public email: string;
  public name: string;
  public surname: string;

  public static fromUser(user: User): UserDto {
    return {
      username: user.username,
      email: user.email,
      name: user.name,
      surname: user.surname,
      id: user.id,
    };
  }
}