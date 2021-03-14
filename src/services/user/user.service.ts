import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(userBody: User) {
    const user = this.userRepo.create(userBody);
    return this.userRepo.save(user);
  }

  showAll() {
    return this.userRepo.find();
  }

  showOne(id: string) {
    return this.userRepo.findOne(id);
  }

  searchByName(name: string) {
    return this.userRepo.findOne({ where: { name } });
  }

  async update(id: string, body) {
    const user = await this.userRepo.findOne(id);
    this.userRepo.update(user, body);
    return this.userRepo.findOne(id);
  }

  async remove(id: string) {
    await this.userRepo.delete(id);
    return;
  }
}
