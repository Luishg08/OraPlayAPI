import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'oraplaysql',
  connector: 'oracle',
  tns: '',
  host: 'localhost',
  port: 1521,
  user: 'MALUSO',
  password: '123',
  database: 'XE'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class OraplaysqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'oraplaysql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.oraplaysql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
