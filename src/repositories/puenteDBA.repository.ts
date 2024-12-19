import {inject} from '@loopback/core';
import oracledb from 'oracledb';
import {OraplaysqlDataSource} from '../datasources';

export class PuenteDBARepository {
  constructor(
    @inject('datasources.oraplaysql') protected dataSource: OraplaysqlDataSource,
  ) {}

  async ejecutarProcedimientoTemporal(): Promise<string> {
    const sql = `BEGIN pruebaTemporal(:resultado); END;`;

    // Parámetros con valor directo para el tipo
    const params = [
      {
        dir: oracledb.BIND_OUT, // Parámetro de salida
        type: 2001,             // 2001 equivale a oracledb.STRING
        maxSize: 2000,          // Tamaño del buffer
      },
    ];

    // Ejecutar el procedimiento almacenado
    const result = await this.dataSource.execute(sql, params);

    // Retornar el valor del parámetro de salida
    return result.outBinds[0];
  }
}
