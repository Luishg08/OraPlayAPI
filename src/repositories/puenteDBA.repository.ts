import {inject} from '@loopback/core';
import {OraplaysqlDataSource} from '../datasources';

export class PuenteDBARepository {
  constructor(
    @inject('datasources.oraplaysql') protected dataSource: OraplaysqlDataSource,
  ) {}

  async ejecutarProcedimientoTemporal(): Promise<void> {
    const sql = `DELETE FROM TEMPORAL`;
    await this.dataSource.execute(sql); // Ejecución del procedimiento
  }
}
