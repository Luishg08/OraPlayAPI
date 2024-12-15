import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Evento,
  Equipo,
} from '../models';
import {EventoRepository} from '../repositories';

export class EventoEquipoController {
  constructor(
    @repository(EventoRepository)
    public eventoRepository: EventoRepository,
  ) { }

  @get('/eventos/{id}/equipo', {
    responses: {
      '200': {
        description: 'Equipo belonging to Evento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async getEquipo(
    @param.path.number('id') id: typeof Evento.prototype.idEvento,
  ): Promise<Equipo> {
    return this.eventoRepository.equipo(id);
  }
}
