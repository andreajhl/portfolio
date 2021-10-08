import styles from "./styles.module.scss";
import rangeSliderLog10Algorithm from "lib/utils/rangeSliderLog10Algorithm";
type rangeProps={
    touchGraphiInput:(value:{min:string,max:string})=>void;
    maxInputValue:string;
    minInputValue:string;
    max:number,
    min:number
}

var graphic=[]
var value=1
while (graphic.length<20) {
    graphic.push({min:value, max:(value+=5)})
};

export const RangeGraphi= ({touchGraphiInput,maxInputValue, minInputValue, max,min}:rangeProps) => {

    return (
        <div className={styles.PriceRangeGraphi}>
        {graphic.map(e=><p 
            onClick={()=>touchGraphiInput(e)} 
            className={styles.PriceRangeGraphiDiv} 
            style={{
                height:` ${e.max<=55? `${e.max-Math.random()*7}%` : `${100%-Number(e.min)+Math.random()*15}%` }`,
                backgroundColor: `${(Number(e.min)*max)/100 >= Number(minInputValue) && (Number(e.min)*max)/100 <= Number(maxInputValue)? '#FB177D' : '#C4C4C4'} `
                
            }}
            >x</p>
        )}
    </div>
    )
}
