import register from 'good';
import reporter from 'good-console';

function good(server) {
  return new Promise((resolve, reject) => {
    server.register({
      register: register,
      options: {
        reporters: [{
          reporter: reporter,
          events: {
            response: '*',
            log: '*'
          }
        }]
      }
    }, (err) => {
      if (err !== undefined) {
        reject(err);
      }
      resolve();
    });
  });
}

export default good;
