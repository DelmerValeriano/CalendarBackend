
/**
    Rutas de usuarios /Events
    host + /api/events

*/

const {Router} = require('express');
const router = Router();
const {validarJWT} = require('../middlewares/validar-jwt');

const {isDate} =require('../helpers/isDate');

const {check}= require('express-validator');
const {validarCampos} =require('../middlewares/validar-campos');

const {getEventos, crearEvento,actualizarEvento,eliminarEvento} = require('../controllers/events')


//todas tienen que pasar por la validacion del token
router.use(validarJWT);


//obtener events
router.get('/',getEventos);

//crear un nuevo evento
router.post(
    '/',
    [//validaciones
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha inicio es obligatoria').custom(isDate),
        check('end','Fecha finalizacion es obligatoria').custom(isDate),


        validarCampos,
    ],

    crearEvento

);
//actualizar eventos que
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha inicio es obligatoria').custom(isDate),
        check('end','Fecha finalizacion es obligatoria').custom(isDate),


        validarCampos,
    ],

    actualizarEvento
);

    

//borrar eventos 
router.delete('/:id',eliminarEvento);

//exportacion en node de
module.exports =router;




