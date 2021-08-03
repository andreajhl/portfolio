import React from 'react'

import '../../styles/presentacion.scss'
import {IoLogoJavascript, IoLogoCss3,IoLogoHtml5, IoLogoSass,IoLogoReact} from 'react-icons/io5'
import { SiRedux, SiNodeDotJs,SiPostgresql} from "react-icons/si";
import Img from '../../pixlr-bg-result.png'

export default function Presentacion(){
    return (
            <div className="pre_cuerpo">
                <div className="pre_cuerpo_pag">
                    <h1>!Gracias por ver mi pag¡</h1>
                    <p className="pre_cuerpo_pag_P">Mi nombre es Andrea, tengo 22 años, conoci el mundo de la programacion gracias a un amigo. 
                        empece a estudiar un poco, me gusto bastante y fue alli que decidi hacer un bootcamp  
                        , así descubrí a Soy Henry, donde me he formado como Full Stack, estoy empezando en este mundo y espero poder seguir aprendiendo
                    </p>
                </div>
                <div className="pre_cuerpo_Sk">
                    <h1 style={{fontSize: '60px', color: '#232735'}}>Skills</h1>
                    <div className="pre_cuerpo_Sk_l">
                        <div className='icon'>
                            <IoLogoHtml5 className='ii'/>
                            <p>HMLT</p>
                        </div>
                        <div className='icon'>
                            <IoLogoCss3 className='ii'/>
                            <p>CSS</p>
                        </div>
                        <div className='icon'>
                            <IoLogoSass className='ii'/>
                            <p>SASS</p>
                        </div>
                        <div className='icon'>
                            <IoLogoJavascript className='ii'/>
                            <p>Javascript</p>
                        </div>
                        <div className='icon'>
                            <IoLogoReact className='ii'/>
                            <p>React</p>
                        </div>
                        <div className='icon'>
                            <SiRedux className='ii'/>
                            <p>Redux</p>
                        </div>
                        <div className='icon'>
                            <SiNodeDotJs className='ii'/>
                            <p>NodeJS</p>
                        </div>
                        <div className='icon'>
                            <SiPostgresql className='ii'/>
                            <p>PostgreSQL</p>
                        </div>
                         <div className='icon'>
                            <img src={Img} className='ii'/>
                            <p>ExpressJS</p>
                        </div> 
                    </div>
                </div>
            </div>
    )
}
