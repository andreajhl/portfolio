import { CelebritiesFilter } from "react-app/src/components/layouts/celebrities-filter";
import removeParenthesis from "lib/utils/removeParenthesis";
import { useIntl, defineMessage} from "react-intl";
import { COUNTRY_CODE_WITH_TRANSLATIONS_AVAILABLE,
    labelMessagesForCountryCodeFilter,
} from "react-app/src/constants/messages";
import { useMemo } from "react";

const messageForLabelButtonCategoryCountry = defineMessage({
    description: "buttonLabel search by country",
    defaultMessage: "País",
});

const messageForModalTitleCategoryCountry = defineMessage({
    description: "ModalTitle for search CategoryFilter",
    defaultMessage: "Filtrar por país",
});

const messageForSearchPlaceholderCategoryCountry = defineMessage({
    description: "Modal Title for search CategoryFilter",
    defaultMessage: "Buscar país",
});

type filterCountriesProps={
    setFilterParam:(paramName: any) => (paramValues: any) => void,
    countries: [{name:string, id:number, countryCode:string}],
    queryParams:any
}

export const FilterSeccionCountries = ({setFilterParam,countries,queryParams}:filterCountriesProps) => {
    
    const intl = useIntl();
    const activeCountryItems = useMemo(
        () => (queryParams.country_id ? queryParams.country_id.split(",") : []),
        [queryParams.country_id]
    );
    return (
        <CelebritiesFilter
            buttonLabel={intl.formatMessage(
            messageForLabelButtonCategoryCountry
            )}
            modalTitle={intl.formatMessage(
            messageForModalTitleCategoryCountry
            )}
            searchPlaceholder={intl.formatMessage(
            messageForSearchPlaceholderCategoryCountry
            )}
            activeItems={activeCountryItems}
            onApplyFilters={setFilterParam("country_id")}
            options={countries.map((country) => ({
                label: COUNTRY_CODE_WITH_TRANSLATIONS_AVAILABLE.includes(
                    country.countryCode
                )
                    ? removeParenthesis(
                    intl.formatMessage(
                    labelMessagesForCountryCodeFilter[country.countryCode]
                    )
                )
                : removeParenthesis(country.name),
            value: country.id,
            }))}
        />
    )
}
