import React ,{useState} from 'react'

import '../../styles/inicio.scss'
import swal from 'sweetalert';

export const Inicio = () => {

    const [count,setCount]= useState(0)
    

    var tecnologia= ['ReactJs','ExpressJs','Javascript','PostgreSQL','SQL','MongoDB','Mongoose','NodeJs','Redux','CSS', 'HTML5']

    setTimeout(() => {
        const next =count + 1
        if( next > 8) return setCount(0)
        else return setCount(next)
    },1500) ;
    

    return (
        <div className="Inicio">
            <div style={{width:'100%',lineHeight:'400%'}}>
                <div className='Inicio_div'>
                    <h1 className='h1'>¡Hola! soy Andrea Hernández</h1>
                    <h1 className='h2'>Junior Full Stack Developer</h1> 
                    <h1 className='h2'> he trabajado con <label className='h3'>{tecnologia[count]}</label></h1>
                </div>
                <div className="Inicio_btn">
                    <button className='buut' onClick={()=>swal( "CV Descargado", "", "success")}><a className='href' href='https://www.dropbox.com/s/vnkac4nwwmt8vsi/Andrea%20Hernandez.pdf?dl=1'>DESCARGAR CV</a></button>
                </div>  
            </div>
        </div>
    )
}

export default Inicio
