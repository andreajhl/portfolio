import React from 'react';
import { Link } from 'react-scroll';

import '../../styles/nav.scss'

export const Nav =()=>{
    return(
        <div className="nav"> 
            <Link to='inicio' smooth={true}><label>Inicio</label></Link>
            <Link to='presentacion' smooth={true}><label>Presentacion</label></Link>
            <Link to='front'smooth={true} ><label>Proyectos</label></Link>
            <Link to='contacto' smooth={true}><label>Contacto</label></Link>
        </div>
    )
}

export default Nav