import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';
import { CreateGroupPostDto } from './dto/createGroupPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() { userId, ...body }: CreatePostDto) {
    return this.postsService.createPost(userId, body);
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(@Body() { userIds, ...body }: CreateGroupPostDto) {
    return this.postsService.createGroupPost(userIds, body);
  }

  @Get('group')
  async getGroupPosts() {
    return await this.postsService.getGroupPosts();
  }
}
