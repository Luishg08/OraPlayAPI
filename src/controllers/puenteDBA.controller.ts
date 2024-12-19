import {inject} from '@loopback/core';
import {OraplaysqlDataSource} from '../datasources';

export class PuenteDBARepository {
  constructor(
    @inject('datasources.oraplaysql') protected dataSource: OraplaysqlDataSource,
  ) {}

  async ejecutarProcedimientoTemporal(param1: string, param2: string): Promise<string> {
    const sql = `BEGIN pruebaTemporal(:param1, :param2, :resultado); END;`;

    // Parámetros para el procedimiento almacenado
    const params = [
      {
        dir: 3001,             // Código para BIND_IN (entrada)
        type: 2001,            // Código para STRING
        val: param1,           // Valor del primer parámetro
      },
      {
        dir: 3001,             // Código para BIND_IN (entrada)
        type: 2001,            // Código para STRING
        val: param2,           // Valor del segundo parámetro
      },
      {
        dir: 3002,             // Código para BIND_OUT (salida)
        type: 2001,            // Código para STRING
        maxSize: 2000,         // Tamaño máximo del buffer de salida
      },
    ];

    // Ejecutar el procedimiento almacenado
    const result = await this.dataSource.execute(sql, params);

    // Retornar el valor del parámetro de salida
    return result.outBinds[2]; // El índice 2 corresponde al parámetro de salida
  }
}
