import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Partido,
  Estadio,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoEstadioController {
  constructor(
    @repository(PartidoRepository)
    public partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/estadio', {
    responses: {
      '200': {
        description: 'Estadio belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Estadio),
          },
        },
      },
    },
  })
  async getEstadio(
    @param.path.number('id') id: typeof Partido.prototype.idPartido,
  ): Promise<Estadio> {
    return this.partidoRepository.estadio(id);
  }
}
