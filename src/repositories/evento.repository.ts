import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Evento, EventoRelations} from '../models';

export class EventoRepository extends DefaultCrudRepository<
  Evento,
  typeof Evento.prototype.idEvento,
  EventoRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(Evento, dataSource);
  }
}
