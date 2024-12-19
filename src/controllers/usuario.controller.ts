import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',

          }),
        },
      },
    })
    usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuarioRepository.create(usuario);
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
  @post('/usuarios/verificar')
  @response(200, {
    description: 'Verificar si un usuario existe',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async verificarUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['correo', 'contraseña'],
            properties: {
              correo: {type: 'string', format: 'email'},
              contraseña: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {correo: string; contraseña: string},
  ): Promise<object> {
    const {correo, contraseña} = credentials;

    try {
      // Llamada al procedimiento almacenado
      const result = await this.usuarioRepository.dataSource.execute(
        `BEGIN VERIFICAR_USUARIO1(:1, :2, :3); END;`,
        [correo, contraseña, {dir: 3003, type: 'NUMBER'}], // Array de parámetros
      );

      const idUsuario = result[2]; // El tercer parámetro es el idUsuario

      if (idUsuario === -1) {
        return {
          valido: false,
          mensaje: 'Correo o contraseña incorrectos',
        };
      }

      return {
        valido: true,
        mensaje: 'Usuario válido',
        idUsuario: idUsuario, // Retorna el id del usuario si es válido
      };
    } catch (error) {
      console.error('Error al verificar usuario:', error); // Agrega más información sobre el error
      return {
        valido: false,
        mensaje: 'Error al verificar el usuario',
        error: error.message || error, // Agrega el mensaje de error específico
      };
    }
  }
}
