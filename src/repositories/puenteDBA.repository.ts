import {inject} from '@loopback/core';
import oracledb from 'oracledb';
import {OraplaysqlDataSource} from '../datasources';

export class PuenteDBARepository {
  constructor(
    @inject('datasources.oraplaysql') protected dataSource: OraplaysqlDataSource,
  ) {}

  async ejecutarProcedimientoVerificarUsuario(email:string, contraseña:string ): Promise<string> {
    const sql = `BEGIN VERIFICAR_USUARIO1(:email, :contraseña, :resultado); END;`;

    // Parámetros para el procedimiento almacenado
    const params = [
      {dir: oracledb.BIND_IN, type: 2001, maxSize: 4000, val: email},
      {dir: oracledb.BIND_IN, type: 2001, maxSize: 4000, val: contraseña},
      {dir: oracledb.BIND_OUT, type: 2010, maxSize: 4000},
    ];

    // Ejecutar el procedimiento almacenado
    const result = await this.dataSource.execute(sql, params);

    // Retornar el valor del parámetro de salida
    return result.outBinds[0]; // Devuelve el resultado del procedimiento
  }
}
