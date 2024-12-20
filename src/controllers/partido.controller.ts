// filepath: /c:/Users/luish/OneDrive/Documentos/Bases De Datos II/OraPlay/apioraplay/src/controllers/partido.controller.ts
import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {PartidoRepository} from '../repositories';

export class PartidoController {
  constructor(
    @inject('repositories.PartidoRepository')
    private partidoRepository: PartidoRepository,
  ) {}

  @get('/partidos-en-curso', {
    responses: {
      '200': {
        description: 'Array of IDs of partidos en curso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {type: 'number'},
            },
          },
        },
      },
    },
  })
  async encontrarPartidosEnCurso(): Promise<any[]> {
    try {
      // Consultar los partidos en curso desde la base de datos
      const partidosCurso = await this.partidoRepository.dataSource.execute(
        `SELECT IDPARTIDO
         FROM PARTIDO
         WHERE SYSDATE
         BETWEEN TO_DATE(FECHAINICIO, 'YYYY-MM-DD HH24:MI:SS')
         AND TO_DATE(FECHAFIN, 'YYYY-MM-DD HH24:MI:SS')`
      );

      // Verificar si se encontraron partidos en curso
      if (partidosCurso.length === 0) {
        return [];
      }

      // Devolver los partidos en curso
      const partidosEnCurso = [];
      for (const partido of partidosCurso) {
        const partidoModel = await this.partidoRepository.findById(partido.IDPARTIDO, {
          include: [
            {relation: 'equipoLocal'},
            {relation: 'equipoVisitante'},
            {relation: 'estadio'},
            {relation: 'torneo'}
          ],
        });
        partidosEnCurso.push(partidoModel);
      }
      return partidosEnCurso;
    } catch (error) {
      console.error('Error al obtener los partidos en curso:', error);
      throw new Error('Error al obtener los partidos en curso');
    }
  }

  @get('/partidos-pendientes', {
    responses: {
      '200': {
        description: 'Array of IDs of partidos en curso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {type: 'number'},
            },
          },
        },
      },
    },
  })
  async encontrarPartidosPendientes(): Promise<any[]> {
    try {
      // Consultar los partidos en curso desde la base de datos
      const partidosPendientes = await this.partidoRepository.dataSource.execute(
        `SELECT IDPARTIDO
        FROM PARTIDO
        WHERE SYSDATE
        <= TO_DATE(FECHAINICIO, 'YYYY-MM-DD HH24:MI:SS')
        AND ESTADO  = 'PENDIENTE'`
      );

      // Verificar si se encontraron partidos en curso
      if (partidosPendientes.length === 0) {
        return [];
      }

      // Devolver los partidos en curso
      const partidosEnPendientes = [];
      for (const partido of partidosPendientes) {
        const partidoModel = await this.partidoRepository.findById(partido.IDPARTIDO, {
          include: [
            {
              relation: 'equipoLocal',
              scope: {
          include: [{relation: 'jugadores'}],
              },
            },
            {
              relation: 'equipoVisitante',
              scope: {
          include: [{relation: 'jugadores'}],
              },
            },
            {relation: 'estadio'},
            {relation: 'torneo'}
          ],
        });
        partidosEnPendientes.push(partidoModel);
      }
      return partidosEnPendientes;
    } catch (error) {
      console.error('Error al obtener los partidos en curso:', error);
      throw new Error('Error al obtener los partidos en curso');
    }
  }

  @get('/jugadores-por-partido/{idPartido}', {
    responses: {
      '200': {
        description: 'Array of JugadorModel instances for a given partido',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {type: 'object'},
            },
          },
        },
      },
    },
  })
  async encontrarJugadoresPorPartido(
    @param.path.number('idPartido') idPartido: number,
  ): Promise<any> {
    try {
      // Obtener el partido por ID
      const partido:any = await this.partidoRepository.findById(idPartido, {
        include: [
          {
            relation: 'equipoLocal',
            scope: {
              include: [{relation: 'jugadores'}],
            },
          },
          {
            relation: 'equipoVisitante',
            scope: {
              include: [{relation: 'jugadores'}],
            },
          },
        ],
      });

      // Extraer jugadores de ambos equipos
      const jugadores = [
        partido.equipoLocal.jugadores,
        partido.equipoVisitante.jugadores,
      ];

      return jugadores;
    } catch (error) {
      console.error('Error al obtener los jugadores por partido:', error);
      throw new Error('Error al obtener los jugadores por partido');
    }
  }

}
