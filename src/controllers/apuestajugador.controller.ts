import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ApuestaJugador} from '../models';
import {ApuestaJugadorRepository} from '../repositories';

export class ApuestajugadorController {
  constructor(
    @repository(ApuestaJugadorRepository)
    public apuestaJugadorRepository : ApuestaJugadorRepository,
  ) {}

  @post('/apuesta-jugador')
  @response(200, {
    description: 'ApuestaJugador model instance',
    content: {'application/json': {schema: getModelSchemaRef(ApuestaJugador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaJugador, {
            title: 'NewApuestaJugador',
            exclude: ['idApuestaJugador'],
          }),
        },
      },
    })
    apuestaJugador: Omit<ApuestaJugador, 'idApuestaJugador'>,
  ): Promise<ApuestaJugador> {
    return this.apuestaJugadorRepository.create(apuestaJugador);
  }

  @get('/apuesta-jugador/count')
  @response(200, {
    description: 'ApuestaJugador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ApuestaJugador) where?: Where<ApuestaJugador>,
  ): Promise<Count> {
    return this.apuestaJugadorRepository.count(where);
  }

  @get('/apuesta-jugador')
  @response(200, {
    description: 'Array of ApuestaJugador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ApuestaJugador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ApuestaJugador) filter?: Filter<ApuestaJugador>,
  ): Promise<ApuestaJugador[]> {
    return this.apuestaJugadorRepository.find(filter);
  }

  @patch('/apuesta-jugador')
  @response(200, {
    description: 'ApuestaJugador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaJugador, {partial: true}),
        },
      },
    })
    apuestaJugador: ApuestaJugador,
    @param.where(ApuestaJugador) where?: Where<ApuestaJugador>,
  ): Promise<Count> {
    return this.apuestaJugadorRepository.updateAll(apuestaJugador, where);
  }

  @get('/apuesta-jugador/{id}')
  @response(200, {
    description: 'ApuestaJugador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ApuestaJugador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ApuestaJugador, {exclude: 'where'}) filter?: FilterExcludingWhere<ApuestaJugador>
  ): Promise<ApuestaJugador> {
    return this.apuestaJugadorRepository.findById(id, filter);
  }

  @patch('/apuesta-jugador/{id}')
  @response(204, {
    description: 'ApuestaJugador PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaJugador, {partial: true}),
        },
      },
    })
    apuestaJugador: ApuestaJugador,
  ): Promise<void> {
    await this.apuestaJugadorRepository.updateById(id, apuestaJugador);
  }

  @put('/apuesta-jugador/{id}')
  @response(204, {
    description: 'ApuestaJugador PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() apuestaJugador: ApuestaJugador,
  ): Promise<void> {
    await this.apuestaJugadorRepository.replaceById(id, apuestaJugador);
  }

  @del('/apuesta-jugador/{id}')
  @response(204, {
    description: 'ApuestaJugador DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.apuestaJugadorRepository.deleteById(id);
  }
}
