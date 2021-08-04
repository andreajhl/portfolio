import {IoLogoJavascript, IoLogoCss3,IoLogoHtml5, IoLogoSass,IoLogoReact} from 'react-icons/io5'
import { SiRedux, SiNodeDotJs,SiPostgresql} from "react-icons/si";
import Img from '../../Ex.png'

import '../../styles/skill.scss';

export default function Skill (){
    return (
        <div className="cuerpo_Sk">
            <h1 style={{fontSize: '60px', color: '#232735'}}>Skills</h1>
            <div className="cuerpo_Sk_l">
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
    )
}

