import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(input: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: input });
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    // return await this.prisma.user.update({ where: { id }, data });
    const user = await this.getUserById(id);
    if (!user) {
      return new HttpException('User not found', 404);
    }

    if (data.username) {
      const findUser = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });

      if (findUser) {
        return new HttpException('Username already exists', 409);
      }
    }

    return await this.prisma.user.update({ where: { id }, data });
  }

  async deleteUserById(id: number) {
    const user = this.getUserById(id);
    if (!user) {
      return new HttpException('User not found', 404);
    }
    return await this.prisma.user.delete({ where: { id } });
  }
}
