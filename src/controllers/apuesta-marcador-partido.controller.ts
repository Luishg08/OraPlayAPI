import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ApuestaMarcador,
  Partido,
} from '../models';
import {ApuestaMarcadorRepository} from '../repositories';

export class ApuestaMarcadorPartidoController {
  constructor(
    @repository(ApuestaMarcadorRepository)
    public apuestaMarcadorRepository: ApuestaMarcadorRepository,
  ) { }

  @get('/apuesta-marcadors/{id}/partido', {
    responses: {
      '200': {
        description: 'Partido belonging to ApuestaMarcador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partido),
          },
        },
      },
    },
  })
  async getPartido(
    @param.path.number('id') id: typeof ApuestaMarcador.prototype.idApuestaMarcador,
  ): Promise<Partido> {
    return this.apuestaMarcadorRepository.partido(id);
  }
}
