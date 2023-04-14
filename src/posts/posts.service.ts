import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    const post = this.prisma.post.create({
      data: {
        title: createPostDto.title,
        body: createPostDto.body,
      },
    });

    return post;
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: string) {
    const post = this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    return post;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const post = this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: updatePostDto.title,
        body: updatePostDto.body,
      },
    });

    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    return post;
  }

  remove(id: string) {
    const post = this.prisma.post.delete({
      where: {
        id: id,
      },
    });

    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    return post;
  }
}
