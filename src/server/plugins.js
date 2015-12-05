import good from './plugins/good';
import inert from './plugins/inert';

class Plugins {
  constructor(server) {
    this.good = good(server);     // logger
    this.inert = inert(server);   // static file handler
  }
}

export default Plugins;
