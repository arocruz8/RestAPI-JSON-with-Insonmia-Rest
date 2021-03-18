import express, { urlencoded, json} from 'express';

const app = express();

//settings
app.set('port', process.env.PORT || 5000);

//app.get('/', (req, res)=> res.send('Bienvenido Rest API Json Schema'));

//middlewares
app.use(urlencoded({ extended: false }));
app.use(json());

//routes
import IndexRoutes from './routes/index.routes'
import TasksRoutes from './routes/tasks.routes'

app.use(IndexRoutes);
app.use('/tasks',TasksRoutes);

export default app;