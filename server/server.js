const { app, port } = require('./app');

const server = app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
});

module.exports = server;