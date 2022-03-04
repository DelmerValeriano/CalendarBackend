const {response} = require('express');
const Evento =require('../models/Evento');


const getEventos =async(req,res =response)=>{


    //traemos todos los eventos con find y con populate traemos la referencia del Schema los datos
    const eventos = await Evento.find()
                                .populate('user','name');
    res.json({
        ok: true,
      eventos

    })
}


const crearEvento =async(req,res =response)=>{

    //verificar que tenga el evento

    const evento =new Evento(req.body);
    try {

        evento.user=req.uid;

        const eventoGuardado = await evento.save();
        res.json({
            ok:true,
            evento:eventoGuardado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hablen con el administrador'
        });
        
    }
    

}


const actualizarEvento =async(req,res =response)=>{
    
    //Primer paso optener el id dl evento
    const eventoId =req.params.id;
    const uid = req.uid;

    try {
        //verificar si ese elmento exists
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            });
        }
        //determinar si el usuario es el que creo el evento para que lo pueda actualizar

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'Notiene privilegios de editar este evento'

            });
        }

        //nueva data
        const  nuevoEvento ={
            ...req.body,
            user:uid
        }

        //el findByIdAndUpdate sirve para actualizar el evento pidiento el primer valor el id a actualizar y el segundo el nuevo
        //el tercer valor es para mandar el evento actualizado 
        const eventoActualizado =await  Evento.findByIdAndUpdate(eventoId,nuevoEvento, {new:true});

        res.json({
            ok:true,
            evento: eventoActualizado

        });

            

        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hablen con el administrador'
        });
    }

}


const eliminarEvento =async(req,res =response)=>{



    const eventoId =req.params.id;
    const uid = req.uid;

    try {
        //verificar si ese elmento exists
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            });
        }
        //determinar si el usuario es el que creo el evento para que lo pueda actualizar

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'Notiene privilegios de eliminar este evento'

            });
        }


        //el findByIdAndUpdate sirve para actualizar el evento pidiento el primer valor el id a actualizar y el segundo el nuevo
        //el tercer valor es para mandar el evento actualizado 
        await  Evento.findByIdAndDelete(eventoId);

        res.json({
            ok:true,
        });
          


            

        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hablen con el administrador'
        });
    }

}


module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}

