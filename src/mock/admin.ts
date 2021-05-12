import { AdminEntity } from '@/admins/admins.entity';

export const MockUserList = [
  new AdminEntity({
    username: 'qiaoyuwen',
    password: 'b79babf5cefc3bc52758055c25937b235464cb3c',
  }),
];

export const mockAdminService = {
  findOne: ({ username }: { username: string }) => {
    return MockUserList.find((user) => user.username === username);
  },
  save: (username: string, password: string) =>
    new AdminEntity({
      username,
      password,
    }),
};
