import React from 'react'

import '../../styles/contacto.scss'
import { SiLinkedin, SiGithub, SiGmail} from "react-icons/si";

export const Contacto = () => {
    return (
        <div className="contac">
            <div className="contac_Port">
                <div className='contac_Port_text'>
                    <h2>¿Hablamos?</h2>
                    <p>Espero te haya gustado mi porfolio, si quieres darme feedback sobre mis proyectos o alguna recomendacion, estoy siempre abierta a aprender y, además... Estoy buscando mi primera oportunidad como desarrolladora; Si crees que mi perfil profesional encaja con lo que buscas ¡no dudes en contactarme!</p>
                </div>
                </div>
            <div className="contac_Red">
                    <p className='p'><SiGmail/></p>
                    <p className='p'>CV</p>
                    <p className='p'><SiGithub /></p>
                    <p className='p'><SiLinkedin /></p>
            
            </div>
        </div>
    )
}

export default Contacto