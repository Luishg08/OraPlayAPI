import {
  repository
} from '@loopback/repository';
import {
  get,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {UsuarioRepository} from '../repositories';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @post('/usuario')
  @response(200, {
    description: 'Usuario creado exitosamente',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async create1(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['nombre', 'apellido', 'correo', 'password', 'telefono'],
            properties: {
              nombre: {type: 'string'},
              apellido: {type: 'string'},
              correo: {type: 'string', format: 'email'},
              password: {type: 'string'},
              telefono: {type: 'string'},
            },
          },
        },
      },
    })
    usuarioData: {
      nombre: string;
      apellido: string;
      correo: string;
      password: string;
      telefono?: string;
    },
  ): Promise<object> {
    try {
      // Insertar datos directamente en la base de datos
      const result = await this.usuarioRepository.dataSource.execute(
        `INSERT INTO USUARIO (NOMBRE, APELLIDO, CORREO, PASSWORD, TELEFONO)
      VALUES (:nombre, :apellido, :correo, :password, :telefono)`,
        [
          usuarioData.nombre,
          usuarioData.apellido,
          usuarioData.correo,
          usuarioData.password,
          usuarioData.telefono,
        ],
      );

      return {message: 'Usuario creado exitosamente', result};
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      throw new Error('Error al insertar usuario');
    }
  }

  @get('/usuario/{id}')
  @response(200, {
    description: 'Datos del usuario obtenidos exitosamente',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            nombre: {type: 'string'},
            apellido: {type: 'string'},
            correo: {type: 'string', format: 'email'},
            telefono: {type: 'string'},
            saldo: {type: 'number'},
          },
        },
      },
    },
  })
  async getUserData(
    @param.path.number('id') id: number,  // Obtener ID desde la URL
  ): Promise<object> {
    try {
      // Consultar datos del usuario usando su ID
      const userData = await this.usuarioRepository.dataSource.execute(
        `SELECT NOMBRE, APELLIDO, CORREO, TELEFONO, SALDO
        FROM USUARIO
        WHERE IDUSUARIO = :id`,
        [id],
      );

      // Verificar si el usuario existe
      if (userData.length === 0) {
        throw new Error('Usuario no encontrado');
      }

      return {
        nombre: userData[0].NOMBRE,
        apellido: userData[0].APELLIDO,
        correo: userData[0].CORREO,
        telefono: userData[0].TELEFONO,
        saldo: userData[0].SALDO,
      };
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      throw new Error('Error al obtener los datos del usuario');
    }
  }

}
