import PaymentMethodFormElement from 'desktop-app/components/payments-methods/form-element';
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import StarRatingDisplay from 'desktop-app/components/common/star-rating/display';
import { FormattedMessage } from "lib/custom-intl";
import styles from "./styles.module.scss";
import  {useState} from "react";


type timeFilterProps={
  isOpen:boolean,
  toOpen: (value:string)=> void
};

function FilterRatingNavbar({isOpen, toOpen}:timeFilterProps) {
    
  const [starChecked, setStarChecked] = useState(0);

 const onChangeRating=(value)=>{
    setStarChecked(value)
 };

  return (
    <div className={styles.option}>
        <p className={styles.optionTittle} onClick={()=>toOpen('rating')}><FormattedMessage defaultMessage= "Calificaciónes"/></p>
        <div className={styles.ContainerOption} >
        <PaymentMethodFormElement
          labelId={'delivery-time-navBar'}
          sectionId={'delivery-time-navBar'}
          expanded={isOpen}
        >
      <StarRatingDisplay
        value={starChecked}
        editing
        onChangeRating={onChangeRating}
        starSchemeColor={'pink'}
      />
        </PaymentMethodFormElement>
        </div>
    </div>
  );
}


export {FilterRatingNavbar };
