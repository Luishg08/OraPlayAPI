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
  Equipo,
} from '../models';
import {ApuestaEventoRepository} from '../repositories';

export class ApuestaEventoEquipoController {
  constructor(
    @repository(ApuestaEventoRepository)
    public apuestaEventoRepository: ApuestaEventoRepository,
  ) { }

  @get('/apuesta-eventos/{id}/equipo', {
    responses: {
      '200': {
        description: 'Equipo belonging to ApuestaEvento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async getEquipo(
    @param.path.number('id') id: typeof ApuestaEvento.prototype.idApuestaEvento,
  ): Promise<Equipo> {
    return this.apuestaEventoRepository.equipo(id);
  }
}
