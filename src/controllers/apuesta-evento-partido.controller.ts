import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ApuestaEvento,
  Partido,
} from '../models';
import {ApuestaEventoRepository} from '../repositories';

export class ApuestaEventoPartidoController {
  constructor(
    @repository(ApuestaEventoRepository)
    public apuestaEventoRepository: ApuestaEventoRepository,
  ) { }

  @get('/apuesta-eventos/{id}/partido', {
    responses: {
      '200': {
        description: 'Partido belonging to ApuestaEvento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partido),
          },
        },
      },
    },
  })
  async getPartido(
    @param.path.number('id') id: typeof ApuestaEvento.prototype.idApuestaEvento,
  ): Promise<Partido> {
    return this.apuestaEventoRepository.partido(id);
  }
}
