import Hapi from 'hapi';
import config from './config';
import routes from './routes';
import Plugins from './plugins';

const server = new Hapi.Server(config.server.opts);
server.connection(config.server.props.connection);

const plugins = new Plugins(server);
Promise.all([plugins.good, plugins.inert]).then(() => {
  server.route(routes);
  server.start(() => {
    console.info('Server running at: ' + server.info.uri);
  });
}, (err) => {
  console.error(err);
});
