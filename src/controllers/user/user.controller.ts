import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() body) {
    return this.userService.create(body);
  }

  @Get()
  showAll(@Query('name') name: string) {
    if (name) {
      return this.userService.searchByName(name);
    }
    return this.userService.showAll();
  }

  @Get(':id')
  showOne(@Param('id') id: string) {
    return this.userService.showOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
