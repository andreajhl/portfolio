import {IoLogoJavascript, IoLogoCss3,IoLogoHtml5, IoLogoSass,IoLogoReact} from 'react-icons/io5'
import { SiRedux, SiNodeDotJs,SiPostgresql} from "react-icons/si";
import Img from '../../Ex.png'

import '../../styles/skill.scss';

export default function Skill (){
    return (
        <div className="cuerpo_Sk">
            <h1 className='skh1'>Skills</h1>
            <div className="cuerpo_Sk_l">
                <div className='icon'>
                    <IoLogoHtml5 className='ii'/>
                    <p className='skp'>HMLT</p>
                </div>
                <div className='icon'>
                    <IoLogoCss3 className='ii'/>
                    <p className='skp'>CSS</p>
                </div>
                <div className='icon'>
                    <IoLogoSass className='ii'/>
                    <p className='skp'>SASS</p>
                </div>
                <div className='icon'>
                    <IoLogoJavascript className='ii'/>
                    <p className='skp'>Javascript</p>
                </div>
                <div className='icon'>
                    <IoLogoReact className='ii'/>
                    <p className='skp'>React</p>
                </div>
                <div className='icon'>
                    <SiRedux className='ii'/>
                    <p className='skp'>Redux</p>
                </div>
                <div className='icon'>
                    <SiNodeDotJs className='ii'/>
                    <p className='skp'>NodeJS</p>
                </div>
                <div className='icon'>
                    <SiPostgresql className='ii'/>
                    <p className='skp'>PostgreSQL</p>
                </div>
                <div className='icon'>
                    <img src={Img} className='ii' alt='icono expressJS'/>
                    <p className='skp'>ExpressJS</p>
                </div> 
            </div>
        </div>
    )
}

