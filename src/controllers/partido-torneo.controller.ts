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
  Torneo,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoTorneoController {
  constructor(
    @repository(PartidoRepository)
    public partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/torneo', {
    responses: {
      '200': {
        description: 'Torneo belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Torneo),
          },
        },
      },
    },
  })
  async getTorneo(
    @param.path.number('id') id: typeof Partido.prototype.idPartido,
  ): Promise<Torneo> {
    return this.partidoRepository.torneo(id);
  }
}
