import {IoLogoJavascript, IoLogoCss3,IoLogoHtml5, IoLogoSass,IoLogoReact} from 'react-icons/io5'
import { SiRedux, SiNodeDotJs,SiPostgresql,SiTypescript} from "react-icons/si";
import {DiMongodb} from "react-icons/di"

import Img from '../../img/ex.png'
import next from '../../img/next.png'

import '../../styles/skill.scss';

export default function Skill (){
    return (
        <div className="cuerpo_Sk">
            <h1 className='skh1'>Skills</h1>
            <div className="cuerpo_Sk_l">
                <div className='icon'>
                    <IoLogoHtml5 className='ii'/>
                    <p className='skp'>HTML</p>
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
                    <SiTypescript className='ii'/>
                    <p className='skp'>Typescript</p>
                </div>
                <div className='icon'>
                    <IoLogoReact className='ii'/>
                    <p className='skp'>React</p>
                </div>
                <div className='icon' style={{alignItems:'center'}}>
                    <img src={next} style={{height:'50%', width:'50%',margin:'10%'}} alt='icono expressJS'/>
                    <p className='skp'>NextJS</p>
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
                    <DiMongodb className='ii'/>
                    <p className='skp'>MongoDb</p>
                </div>
                <div className='icon'>
                    <SiPostgresql className='ii'/>
                    <p className='skp'>PostgreSQL</p>
                </div>
                <div className='icon' style={{alignItems:'center'}}>
                    <img src={Img} style={{height:'100%', width:'80%',margin:'10%'}} alt='icono expressJS'/>
                    <p className='skp'>ExpressJS</p>
                </div> 
            </div>
        </div>
    )
}

