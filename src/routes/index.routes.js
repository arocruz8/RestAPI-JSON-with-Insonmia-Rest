import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.send('Rest API JSON Scheme');
});

export default router;
