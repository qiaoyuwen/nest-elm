import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './admins.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  findOne(username: string): Promise<AdminEntity | undefined> {
    return this.adminRepository.findOne({
      username,
    });
  }

  save(username: string, password: string) {
    const user = new AdminEntity({
      username,
      password,
    });
    return this.adminRepository.save(user);
  }
}
