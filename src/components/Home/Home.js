import React, { useEffect, useState } from 'react';

import Backend from '../Poyectos/Backend/backen'
import FrontEnd from '../Poyectos/Front/FrontEnd'

export default function Home (){
   const [count,setCount]= useState(0)
    
    var tecnologia= ['ReactJs','Express.js','Javascript','Postgres','SQL','Node.js','Redux','CSS', 'HTML5']
    
    setTimeout(() => {
        const next =count + 1
        if( next > 8) return setCount(0)
        else return setCount(next)
    },1500) ;

    return (
        <div>
            <h1>Hola, soy Andrea Hernandez
            <span>Junior Full Stack developer</span> 
              he trabajado con <span>{tecnologia[count]}</span>
            </h1>
            <div>
                <Backend />
            </div>
            <div>
                <FrontEnd />
            </div>
        </div>
    )
}