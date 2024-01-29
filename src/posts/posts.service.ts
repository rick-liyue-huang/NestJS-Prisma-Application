import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  createPost(userId: number, body: Prisma.PostCreateWithoutAuthorInput) {
    return this.prismaService.post.create({
      data: {
        ...body,
        userId: Number(userId),
      },
    });
  }

  createGroupPost(
    userIds: number[],
    data: Prisma.GroupPostCreateWithoutUsersInput
  ) {
    this.prismaService.groupPost.create({
      data: {
        ...data,
        users: {
          create: userIds.map((userId) => ({ userId })),
        },
      },
    });
  }
}
