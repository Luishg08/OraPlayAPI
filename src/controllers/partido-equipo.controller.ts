import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Equipo,
  Partido,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoEquipoController {
  constructor(
    @repository(PartidoRepository)
    public partidoRepository: PartidoRepository,
  ) { }

  // Método para obtener el equipo local
  @get('/partidos/{id}/equipo-local', {
    responses: {
      '200': {
        description: 'Equipo Local belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async getEquipoLocal(
    @param.path.number('id') id: typeof Partido.prototype.idPartido,
  ): Promise<Equipo> {
    return this.partidoRepository.equipoLocal(id);
  }

  // Método para obtener el equipo visitante
  @get('/partidos/{id}/equipo-visitante', {
    responses: {
      '200': {
        description: 'Equipo Visitante belonging to Partido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async getEquipoVisitante(
    @param.path.number('id') id: typeof Partido.prototype.idPartido,
  ): Promise<Equipo> {
    return this.partidoRepository.equipoVisitante(id);
  }
}
