import React from 'react'

import '../../styles/contacto.scss'
import swal from 'sweetalert';
import { SiLinkedin, SiGithub, SiGmail} from "react-icons/si";


export const Contacto = () => {
    var gmail= 'andreajhl29@gmail.com'

   async function copy() {
        await navigator.clipboard.writeText(gmail) 
        swal( {title:"Gmail copiado",icon:"success", buttons:false})
    }
    
    
    return (
        <div className="contac">
            <div className="contac_Port">
                <div className='contac_Port_text'>
                    <h2>¿Hablamos?</h2>
                    <p>Espero te haya gustado mi portafolio, si quieres darme retroalimentación sobre mis proyectos o alguna recomendación, siempre estoy abierta a aprender y, además ... busco mi primera oportunidad como desarrolladora; Si crees que mi perfil profesional encaja con lo que estás buscando, ¡no dudes en contactame!</p>
                </div>
                </div>
            <div className="contac_Red">
                    <button className='p_gmail' style={{background:'none',border:'none'}} onClick={()=> copy()}><SiGmail/></button>
                    <button onClick={()=> swal( {title:"Cv Descargado",icon:"success", buttons:false})} style={{background:'none', border:'none'}}><a href='https://www.dropbox.com/s/hak09go1lxg2lk0/Andrea%20Hernandez.pdf?dl=1' className='p' style={{textDecoration:'none'}}>CV</a></button>
                    <a href='https://github.com/andreajhl' target='_blank' rel = "noreferrer" className='p'><SiGithub /></a>
                    <a href='https://www.linkedin.com/in/andreahernandez29/' target='_blank' rel = "noreferrer" className='p'><SiLinkedin /></a>
            
            </div>
        </div>
    )
}

export default Contacto
