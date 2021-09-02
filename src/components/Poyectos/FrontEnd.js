import React from 'react';

import '../../styles/front.scss'
import bloc from '../../avatar/bloc.jpg'
import peli from '../../avatar/peli.png';
import clima from '../../avatar/clima.png'
import pokemon from '../../avatar/20118-5-pokemon.jpg'
import gifPeli from '../../img/gifPeli.gif'
import gifClima from '../../img/gifClima.gif'
import gifPokemon from '../../img/gifPokemon.gif'
import GitHubIcon from "@material-ui/icons/GitHub";
import LanguageSharpIcon from '@material-ui/icons/LanguageSharp';
export const FrontEnd =()=>{
    return(
        <div className="front">
            <div className="front_titulo">
                <h2> PROYECTOS</h2>
            </div>
            <div className="front_cuerpo">
                <div className="front_DivC">
                    <div className="front_DivC_v">
                        <div className="front_DivC_v_etiq">
                            <div className='avatar'><img src={clima} alt='avatar' className='avatar_img'/></div>
                            <div className='avatar_b'>
                                <h3>AppWheather</h3>
                                <div style={{display:'flex',justifyContent:'space-between',color:'white'}}><p>HTML</p><p>SASS</p><p>JS</p><p>REACT</p><p>REDUX</p></div>
                            </div>
                        </div>
                    </div>
                    <div className='front_DivC_hover'>
                        <div className="front_DivC_hover_img" >
                            <img  className="front_DivC_hover_img_i" src={gifClima} alt='proyect'/>
                        </div>
                        <div className="mostrar">
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <p >AppWheather es una aplicación del clima, los datos son extraídos de 'Spire Weather ' con lo cual puedes buscar el clima de cada cuidad o país del mundo, podes eliminar las tarjetas o ver en mas detalle si quieres</p>
                            </div>
                            <div className='divIcon'>
                             <a href='https://github.com/andreajhl/AppWeather' target='_blank' rel = "noreferrer" ><GitHubIcon className='icon'/></a>
                             <a href='https://app-weather-iagcwlhlc-appweather.vercel.app/' target='_blank' rel = "noreferrer"><LanguageSharpIcon className='icon'/></a>
                            </div> 
                        </div>  
                    </div>
                </div> 
                <div className="front_DivC">
                <div className="front_DivC_v">
                        <div className="front_DivC_v_etiq">
                                <div className='avatar'><img src={peli} alt='avatar' className='avatar_img'/></div>
                                <div className='avatar_b'>
                                    <h3>PeliPOP</h3>
                                    <div style={{display:'flex',justifyContent:'space-between', color:'white'}}><p>HTML</p><p>SASS</p><p>JS</p><p>REACT</p><p>REDUX</p></div>
                                </div> 
                        </div>  
                </div>
                    <div className='front_DivC_hover'>
                    <div className="front_DivC_hover_img" >
                            <img  className="front_DivC_hover_img_i" src={gifPeli}  alt='proyect'/>
                        </div>
                        <div className="mostrar">
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <p>PEliPOP extrae datos de 'API IMDB', en ella podes buscar películas por nombre o palabras claves, guardarlas en favoritos, y ver mas detalle de ellas</p>
                            </div>
                            <div className='divIcon'>
                             <a href='https://github.com/andreajhl/peliPOP' target='_blank' rel = "noreferrer" className='icon'><GitHubIcon/></a>
                             <a href='https://peli-pop-andrea-h.vercel.app/' target='_blank' rel = "noreferrer" className='icon'><LanguageSharpIcon/></a>
                            
                            </div> 
                        </div>
                    </div>

                </div>
                <div className="front_DivC">
                <div className="front_DivC_v">
                        <div className="front_DivC_v_etiq">
                        <div className='avatar'><img src={bloc} alt='avatar' className='avatar_img'/></div>
                            <div className='avatar_b'>
                                <h3>block de tareas</h3>
                                <div style={{display:'flex',justifyContent:'space-between', color:'white'}}><p>HTML</p><p>SASS</p><p>JS</p><p>REACT</p></div>
                            </div>
                        </div>
                    </div>
                    <div className='front_DivC_hover'>          
                    <div className="front_DivC_hover_img" >
                            <img  className="front_DivC_hover_img_i" src={gifPeli} alt='proyect'/>
                        </div>
                        <div className="mostrar">
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <p>Esta app esta desarrollada sin uso de api externa; en ella podes crear un listado de tareas a traves de un formulario, podes ver los detalles de cada tarea y podes modificar su progreso si deseas cuando la hayas completado</p>
                            </div>
                            <div className='divIcon'>
                                <a href='https://github.com/andreajhl/BlockDeNotas' target='_blank' rel = "noreferrer" className='icon'><GitHubIcon/></a>
                               
                                </div> 
                            </div>
                    </div>
                </div>
                <div className="front_DivC">
                <div className="front_DivC_v">
                        <div className="front_DivC_v_etiq">
                        <div className='avatar'><img src={pokemon} alt='avatar' className='avatar_img'/></div>
                            <div className='avatar_b'>
                                <h3>Pokemon App</h3>
                                <div style={{display:'flex',justifyContent:'space-between', color:'white'}}><p>JS</p><p>REACT</p><p>REDUX</p><p>SQL</p><p>POSTGRESQL</p><p>EXPRESS</p></div>
                            </div>
                        </div>  
                    </div>
                    <div className='front_DivC_hover'>
                        <div className="front_DivC_hover_img" >
                            <img  className="front_DivC_hover_img_i"  src={gifPokemon} alt='proyect' />
                        </div>
                        <div className="mostrar">
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <p>Es una aplicación con 40 pokemons para empezar, podes crear mas pokemons a través de un formulario o buscar otros mas por nombres especifico, podes ordenar por fuerza, alfabéticamente o podes filtrarlos por sus tipos o creaciones propias, podes guardarlos en favoritos y ver sus detalles también</p>
                            </div>
                                <div className='divIcon'>
                                    <a href='https://github.com/andreajhl/PokemonApp' target='_blank' rel = "noreferrer" className='icon'><GitHubIcon/></a>
                                   
                                </div> 
                            </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FrontEnd