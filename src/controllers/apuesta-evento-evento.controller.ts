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
  Evento,
} from '../models';
import {ApuestaEventoRepository} from '../repositories';

export class ApuestaEventoEventoController {
  constructor(
    @repository(ApuestaEventoRepository)
    public apuestaEventoRepository: ApuestaEventoRepository,
  ) { }

  @get('/apuesta-eventos/{id}/evento', {
    responses: {
      '200': {
        description: 'Evento belonging to ApuestaEvento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Evento),
          },
        },
      },
    },
  })
  async getEvento(
    @param.path.number('id') id: typeof ApuestaEvento.prototype.idApuestaEvento,
  ): Promise<Evento> {
    return this.apuestaEventoRepository.evento(id);
  }
}
