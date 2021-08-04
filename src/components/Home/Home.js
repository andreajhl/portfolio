import React from 'react';

import Inicio  from '../Inicio/Inicio';
import Contacto from '../Contacto/Contacto';
import Nav from '../Nav/Nav';
import FrontEnd from '../Poyectos/Front/FrontEnd'
import Presentacion from '../Presentacion/Presentacion';

import '../../styles/home.scss'
import '../../styles/nav.scss'

export const Home =()=>{
   

    return (
        <div className="home">
            <header className="home_header"><Nav /></header>
            <div className='home_ini' id='inicio'>
                <Inicio />
            </div>
            <di className='home_pre' id='presentacion'>
                 <Presentacion />
            </di>
            <div className='home_work' id='front'>
                    <FrontEnd />
            </div>
            
            <div className='home_contacto' id='contacto'>
                <Contacto />
            </div>
        </div>
    )
}
export default Home