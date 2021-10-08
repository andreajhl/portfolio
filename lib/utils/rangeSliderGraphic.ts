type touchGraphiProp={
    e:{min:string, max:string}
    min:number,
    max:number,
    setMaxInputValue:(value:string)=>void,
    changeHighValue:(value:string)=>void
}

export function touchGraphi({
        e,min,max,
        setMaxInputValue,
        changeHighValue
    }:touchGraphiProp){

    let rangoMin=(min*100)/max
    let rangoMax=(max*100)/max

  if(e.min==="0.00"){
      setMaxInputValue(`${min}`)
      changeHighValue(`${min}`) 
  }
  if(Number(e.min)>rangoMin && Number(e.min)<rangoMax) {
    setMaxInputValue(`${(Number(e.min)*max)/100}`)
    changeHighValue(`${(Number(e.min)*max)/100}`) 
  }
}