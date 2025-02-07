import * as mongoose from 'mongoose';

import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const dbUri = configService.get<string>('DB_URI');

      if (!dbUri) {
        throw new Error('DB_URI is not defined in the environment variables');
      }

      return mongoose.connect(dbUri);
    },
  },
];
