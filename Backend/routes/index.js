module.exports = (routes) => {
  require('./admin')(routes);
  require('./inventory')(routes);
}