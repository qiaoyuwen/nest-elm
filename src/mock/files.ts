import { FileEntity } from '@/files/files.entity';

export const mockFileEntity = new FileEntity({});

export const mockFilesService = { save: () => mockFileEntity };
