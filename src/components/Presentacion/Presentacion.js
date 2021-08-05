import React from 'react'

import Skill from './Skill.js'
import '../../styles/presentacion.scss'

export default function Presentacion(){
    return (
            <div className="pre_cuerpo">
                <div className="pre_cuerpo_pag">
                    <h1 className='hi'>¡Bienvenido a mi pag!</h1>
                    <p className="pre_cuerpo_pag_P">Mi nombre es Andrea, tengo 22 años, conocí el mundo de la programación gracias a un amigo. 
                        empece a estudiar un poco, me gusto bastante y fue allí que decidí hacer un bootcamp  
                        , así descubrí a Soy Henry, donde me he formado como Full Stack, estoy empezando en este mundo y espero poder seguir aprendiendo
                    </p>
                </div>
               <div className='skill'><Skill/></div>
            </div>
    )
}
