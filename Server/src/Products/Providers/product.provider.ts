import { Connection } from 'mongoose';

import { ProductSchema } from '../Schemas/produces.schema';

export const productsProviders = [
  {
    provide: 'PRODUCTS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Products', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
