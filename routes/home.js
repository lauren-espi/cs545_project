import { create } from "express-handlebars";
import browseRoutes from "./browse.js"
import createRoutes from "./create.js"

const constructorMethod = (app) => {
  app.get('/', function (req, res) {
    res.render('home', { pageTitle: 'Home'});
  });
  app.use('/browse', browseRoutes);
  app.use('/create', createRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};
export default constructorMethod;