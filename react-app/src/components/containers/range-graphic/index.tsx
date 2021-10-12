import styles from "./styles.module.scss";

type rangeProps={
    maxInputValue:string;
    minInputValue:string;
    max:number,
    rankGraphi:{price:number,percentage:number}[]
}

export const RangeGraphi= ({maxInputValue, minInputValue, max, rankGraphi}:rangeProps) => {

    return (
        <div className={styles.PriceRangeGraphi}>
        {rankGraphi.map(e=><p 
            className={styles.PriceRangeGraphiDiv} 
            style={{
                height:` ${e.percentage < 10 ? `${e.percentage*5}px`: `${e.percentage }px`}`,
                backgroundColor: `${e.price >= Number(minInputValue) && e.price <= Number(maxInputValue) ? '#FB177D' : '#C4C4C4'}`,
                width: `${100/rankGraphi.length}%`
            }}
            >x</p>
        )}
    </div>
    )
}
