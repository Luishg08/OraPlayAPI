import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Estadistica,
  Partido,
} from '../models';
import {EstadisticaRepository} from '../repositories';

export class EstadisticaPartidoController {
  constructor(
    @repository(EstadisticaRepository)
    public estadisticaRepository: EstadisticaRepository,
  ) { }

  @get('/estadisticas/{id}/partido', {
    responses: {
      '200': {
        description: 'Partido belonging to Estadistica',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partido),
          },
        },
      },
    },
  })
  async getPartido(
    @param.path.number('id') id: typeof Estadistica.prototype.idEstadistica,
  ): Promise<Partido> {
    return this.estadisticaRepository.partido(id);
  }
}
