/*
    Rutas de usuarios /Auth
    host + /api/auth

*/

const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {crearUsuario,loginUsuario,revalidarToken} =require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');






router.post(
    '/new',
    [//middlewares
        check('name','El nombres es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 carracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario
);

        


router.post(
    '/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 carracteres').isLength({min:6}),
        validarCampos

    ],
    loginUsuario
);


router.get('/renew',validarJWT,revalidarToken);


//exportacion en node de
module.exports =router;

