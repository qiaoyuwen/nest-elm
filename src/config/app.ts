import { registerAs } from '@nestjs/config';

export const AppConfigNamespace = 'app';

export interface AppConfig {
  port: number;
  swagger: boolean;
}

const config: AppConfig = {
  port: 9999,
  swagger: true,
};
export default registerAs(AppConfigNamespace, () => config);
