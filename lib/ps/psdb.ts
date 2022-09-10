import { createPool } from 'mysql2';
import type * as Pool from 'mysql2/typings/mysql/lib/Pool';

export const connection: Pool = createPool(import.meta.env.DATABASE_URL);