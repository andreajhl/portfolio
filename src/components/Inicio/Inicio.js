import React ,{useState} from 'react'

import '../../styles/inicio.scss'

export const Inicio = () => {

    const [count,setCount]= useState(0)
    
    var tecnologia= ['ReactJs','Express.js','Javascript','Postgres','SQL','Node.js','Redux','CSS', 'HTML5']
    
    setTimeout(() => {
        const next =count + 1
        if( next > 8) return setCount(0)
        else return setCount(next)
    },1500) ;

    return (
        <div className="Inicio">
            <div className='Inicio_div'>
                <h1>Hola! soy Andrea Hernandez</h1>
                <h1>soy Junior Full Stack Developer</h1> 
                <h1> he trabajado con <label>{tecnologia[count]}</label></h1>
            </div>
            <div className="Inicio_img">
                <img   className="Inicio_img_imag"src='https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59c4f5655bafe82c692a7052/gato-marron_0.jpg' alt='mi foto'/>
            </div>
        </div>
    )
}

export default Inicio