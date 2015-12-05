import register from 'inert';

function inert(server) {
  return new Promise((resolve, reject) => {
    server.register(register, (err) => {
      if (err !== undefined) {
        reject(err);
      }
      resolve();
    });
  });
}

export default inert;
