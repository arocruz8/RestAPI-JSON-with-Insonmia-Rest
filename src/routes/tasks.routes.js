import {Router} from 'express';
import { MongoClient, ObjectID } from 'mongodb';
const router = Router();

//db conection 
import {connect} from '../database'

//obtiene el resultado que hay dentro del cuerpo del json 
router.get('/', async (req, res) => {
    const db = await connect();
    //obtiene los datos de la coleccion en MongoDB
    const resultado = await db.collection('Students').find({}).toArray();
    console.log(resultado);
    //imprime el resultado en formato json
    res.json(resultado);
});

//agrega un objeto nuevo al json
router.post('/', async (req, res) => {
    const db = await connect();
    //formato del cuerpo para imprimir
    const task = {
       nombre: req.body.nombre,
       id: req.body.id,
       carrera: req.body.carrera,
       email: req.body.email,
       direccion: req.body.direccion,
       sede: req.body.sede,
   }
   //agrega en la base de datos
   const resultadoAgregado = await db.collection('Students').insert(task);
   console.log(resultadoAgregado);
   //parsea a partir de esa posicion 
   res.json(resultadoAgregado.ops[0]);
});

//obtiene el resultado de un solo el id de la BD consultado
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    //hace la consulta en la base de datos por el id de la BD
    const result = await db.collection('Students').findOne({ _id: ObjectID(id) });
    res.json(result);
});

//elimina un estudiante por id de la BD
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    //elimina segun el id de MongoDb
    const result = await db.collection('Students').deleteOne({ _id: ObjectID(id) });
    res.json({message: `Estudiante ${id} Eliminado`,result});
});

//actualiza un valor
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newStudents = {
        nombre: req.body.nombre,
        id: req.body.id,
        carrera: req.body.carrera,
        email: req.body.email,
        direccion: req.body.direccion,
        sede: req.body.sede,
    };
    const db = await connect();
    const result = await db.collection('Students').updateOne({ _id: ObjectID(id) }, {$set: newStudents});
    res.json({
        message: `El estudiante ${id} ha sido actualizad`
    });
});


export default router;
