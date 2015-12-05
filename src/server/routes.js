const routes = [{
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply.file('index.html');
  }
}, {
  method: 'GET',
  path: '/{filename}',
  handler: (request, reply) => {
    reply.file(request.params.filename);
  }
}];

export default routes;
