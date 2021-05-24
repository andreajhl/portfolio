import { getSearchCountryPath } from "constants/paths";
import { Link } from "../routing/link";
import styles from "./styles.module.scss";

type CountryFlagProps = {
  alpha2Code: string;
  countryId: number;
  width?: number;
  className?: string;
};

function CountryFlag({
  alpha2Code,
  countryId,
  width = 20,
  className = "",
}: CountryFlagProps) {
  return (
    <Link href={getSearchCountryPath(countryId)} className={styles.CountryFlag}>
      <img
        src={`https://flagcdn.com/w20/${
          alpha2Code?.toLowerCase?.() || "co"
        }.webp`}
        alt={`Bandera de ${alpha2Code}`}
        className={className}
        width={width}
        height="13"
      />
    </Link>
  );
}

export { CountryFlag };
