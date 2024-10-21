import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { mongoose } from './config/database.config';

//MALR: imports Swagger
//MALR: imports Routes
import routeAPI from './api/v1/routes/index';
//MALR: imports Middlewares
//MALR: Config para variables de entorno
import config from './config/config';
//MALR: Declaramos la constante app igualandola a express
const app = express();
//MALR: Settings
app.set('port', config.PORT);
//MALR: Middlewares generales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//MALR: Routes
// Routes
routeAPI(app);
const api = config.API_URL;
app.get(`${api}`, (req,res)=>{
    res.send(
        `<h1>RESTful running in root</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})
app.get('/MALR', (req,res)=>{
    res.send(
        `<h1>RESTful running in MALR</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})
// Routes
// Swagger Docs
// Middleware para el manejo de errores
// Export App
export default app;