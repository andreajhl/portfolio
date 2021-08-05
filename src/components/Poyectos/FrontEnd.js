import React from 'react';

import '../../styles/front.scss'
import gifPeli from '../../img/gifPeli.gif'
import gifClima from '../../img/gifClima.gif'

export const FrontEnd =()=>{
    return(
        <div className="front">
            <div className="front_titulo">
                <h2> PROYECTOS</h2>
            </div>
            <div className="front_cuerpo">
                <div className="front_DivC">
                    <div className='front_DivC_hover'>
                        <div className="front_DivC_hover_img" >
                            <img  className="front_DivC_hover_img_i" src={gifClima} alt='proyect'/>
                        </div>
                        <div className="mostrar">
                            <p > Es una aplicacion del clima, los datos son extraidos de 'API WEDER' con lo cual puedes buscar el clima de cada cuidad o pais del mundo, podes eliminar las tarjetas o ver en mas detalles si quieres</p>
                        </div>  
                    </div>
                    <div className="front_DivC_v">
                        <h3>AppWheather</h3>
                        <div className="front_DivC_v_etiq">
                            <p>HTML</p>CSS<p>JS</p><p>REACT / REDUX</p>
                        </div>
                    </div>
                </div> 
                <div className="front_DivC">
                    <div className='front_DivC_hover'>
                    <div className="front_DivC_hover_img" >
                            <img  className="front_DivC_hover_img_i" src={gifPeli}  alt='proyect'/>
                        </div>
                        <div className="mostrar">
                            <p>Esta apliacion esta hecha con datos de la api 'Movie', en ella podes buscar peliculas por nombre, guardarlas en favoritos, y ver mas detaller de ella</p>
                        </div>
                    </div>
                    <div className="front_DivC_v">
                      <h3>PeliPOP</h3>
                        <div className="front_DivC_v_etiq">
                            <p>HTML</p>SASS<p>JS</p><p>REACT / REDUX</p>
                        </div>  
                    </div>
                </div>
                <div className="front_DivC">
                    <div className='front_DivC_hover'>          
                    <div className="front_DivC_hover_img" >
                            <img  className="front_DivC_hover_img_i" src={gifPeli} alt='proyect'/>
                        </div>
                        <div className="mostrar">
                            <p>en esta practica no usamos ninguna api externa, en ella podes crear un listado de tareas a traves de un formulario, podes ver los detalles de cada tarea y podes modificar su progreso si deseas cuando la hayas completado</p>
                        </div>
                    </div>
                    <div className="front_DivC_v">
                        <h3>block de tareas</h3>
                        <div className="front_DivC_v_etiq">
                            <p >HTML</p>SASS<p>JS</p><p>REACT</p>
                        </div>
                    </div>
                </div>
                <div className="front_DivC">
                    <div className='front_DivC_hover'>
                        <div className="front_DivC_hover_img" >
                            <img  className="front_DivC_hover_img_i"  src={gifPeli} alt='proyect' />
                        </div>
                        <div className="mostrar">
                            <p style={{padding:'3%'}}>En la aplicacion contas con una base de 40 pokemons para empezar, podes crear los tutyos propios a traves de un formulario o buscar otros mas por nombres especifico, podes ordenar por fuerza, alfabeticamente o podes filtratlos por sus tipos o creaciones propias, podes guardarlos en favoritos y ver sus detalles tambien</p>
                        </div>
                    </div>
                    <div className="front_DivC_v">
                      <h3>App Pokemon</h3>
                    <div className="front_DivC_v_etiq">
                        <p>SQL</p><p>POSTGRE</p><p>EXPRESS</p><p>HTML</p><p></p><p>REACT / REDUX</p>
                    </div>  
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FrontEnd