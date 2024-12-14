import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  ApuestaJugador,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioApuestaJugadorController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Array of Usuario has many ApuestaJugador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ApuestaJugador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ApuestaJugador>,
  ): Promise<ApuestaJugador[]> {
    return this.usuarioRepository.apuestaJugadores(id).find(filter);
  }

  @post('/usuarios/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApuestaJugador)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaJugador, {
            title: 'NewApuestaJugadorInUsuario',
            exclude: ['idApuestaJugador'],
            optional: ['usuarioId']
          }),
        },
      },
    }) apuestaJugador: Omit<ApuestaJugador, 'idApuestaJugador'>,
  ): Promise<ApuestaJugador> {
    return this.usuarioRepository.apuestaJugadores(id).create(apuestaJugador);
  }

  @patch('/usuarios/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Usuario.ApuestaJugador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaJugador, {partial: true}),
        },
      },
    })
    apuestaJugador: Partial<ApuestaJugador>,
    @param.query.object('where', getWhereSchemaFor(ApuestaJugador)) where?: Where<ApuestaJugador>,
  ): Promise<Count> {
    return this.usuarioRepository.apuestaJugadores(id).patch(apuestaJugador, where);
  }

  @del('/usuarios/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Usuario.ApuestaJugador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ApuestaJugador)) where?: Where<ApuestaJugador>,
  ): Promise<Count> {
    return this.usuarioRepository.apuestaJugadores(id).delete(where);
  }
}
