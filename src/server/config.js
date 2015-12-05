import path from 'path';

const config = {
  server: {
    opts: {
      connections: {
        routes: {
          files: {
            relativeTo: path.join(__dirname, 'public')
          }
        }
      }
    },
    props: {
      connection: {
        port: 3000
      }
    }
  }
};

export default config;
