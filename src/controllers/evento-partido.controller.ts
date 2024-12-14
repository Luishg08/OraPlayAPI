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
  Partido,
} from '../models';
import {EventoRepository} from '../repositories';

export class EventoPartidoController {
  constructor(
    @repository(EventoRepository)
    public eventoRepository: EventoRepository,
  ) { }

  @get('/eventos/{id}/partido', {
    responses: {
      '200': {
        description: 'Partido belonging to Evento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Partido),
          },
        },
      },
    },
  })
  async getPartido(
    @param.path.number('id') id: typeof Evento.prototype.idEvento,
  ): Promise<Partido> {
    return this.eventoRepository.partido(id);
  }
}
