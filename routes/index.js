const constructorMethod = (app) => {
  app.get('/', function (req, res) {
    res.render('home', { pageTitle: 'Home'});
  });

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};
export default constructorMethod;