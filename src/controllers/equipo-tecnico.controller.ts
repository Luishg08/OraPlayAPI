import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Equipo,
  Tecnico,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoTecnicoController {
  constructor(
    @repository(EquipoRepository)
    public equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/tecnico', {
    responses: {
      '200': {
        description: 'Tecnico belonging to Equipo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tecnico),
          },
        },
      },
    },
  })
  async getTecnico(
    @param.path.number('id') id: typeof Equipo.prototype.idEquipo,
  ): Promise<Tecnico> {
    return this.equipoRepository.tecnico(id);
  }
}
