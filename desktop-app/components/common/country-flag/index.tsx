import { getSearchCountryPath } from "constants/paths";
import { Link } from "../routing/link";
import styles from "./styles.module.scss";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  flagImgAlt: {
    defaultMessage: "Bandera de {alpha2Code}",
  },
});

type CountryFlagProps = {
  alpha2Code: string;
  countryId: number;
  width?: number;
  className?: string;
  onClick?: (event: any) => void;
};

function CountryFlag({
  alpha2Code,
  countryId,
  width = 20,
  className = "",
  onClick,
}: CountryFlagProps) {
  const { formatMessage } = useIntl();
  const flagImgAlt = formatMessage(messages.flagImgAlt, { alpha2Code });

  return (
    <Link
      href={getSearchCountryPath(countryId)}
      className={styles.CountryFlag}
      onClick={onClick}
    >
      <img
        src={`https://flagcdn.com/w20/${
          alpha2Code?.toLowerCase?.() || "co"
        }.webp`}
        alt={flagImgAlt}
        className={className}
        width={width}
        height="13"
      />
    </Link>
  );
}

export { CountryFlag };
