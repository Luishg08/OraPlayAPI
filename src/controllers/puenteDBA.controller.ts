import {inject} from '@loopback/core';
import {post} from '@loopback/rest';
import {PuenteDBARepository} from '../repositories';

export class PuenteDBAController {
  constructor(
    @inject('repositories.PuenteDBARepository')
    private puenteDBARepository: PuenteDBARepository,
  ) {}

  @post('/ejecutar-temporal', {
    responses: {
      '200': {
        description: 'Ejecución del procedimiento pruebaTemporal',
      },
    },
  })
  async ejecutarProcedimiento(): Promise<string> {
    await this.puenteDBARepository.ejecutarProcedimientoTemporal();
    return 'Procedimiento ejecutado correctamente';
  }
}
