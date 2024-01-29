import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(input: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...input,
        userSetting: {
          create: {
            notificationsOn: false,
            smsEnabled: true,
          },
        },
      },
    });
  }

  getUsers() {
    return this.prisma.user.findMany({ include: { userSetting: true } });
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        userSetting: {
          select: {
            smsEnabled: true,
            notificationsOn: false,
          },
        },
        posts: true,
      },
    });
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

  async updateUserSettingsByUserId(
    userId: number,
    data: Prisma.UserSettingUpdateInput
  ) {
    const user = await this.getUserById(userId);
    if (!user) {
      return new HttpException('User not found', 404);
    }

    if (!user.userSetting) {
      throw new HttpException('User setting not found', 404);
    }
    return await this.prisma.userSetting.update({
      where: { userId },
      data,
    });
  }
}
