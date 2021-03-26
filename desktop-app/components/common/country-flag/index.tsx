type CountryFlagProps = {
  alpha2Code: string;
  width?: number;
  className?: string;
};

function CountryFlag({
  alpha2Code,
  width = 20,
  className = ""
}: CountryFlagProps) {
  return (
    <img
      src={`https://flagcdn.com/w20/${
        alpha2Code?.toLowerCase?.() || "co"
      }.webp`}
      alt={`Bandera de ${alpha2Code}`}
      className={className}
      width={width}
    />
  );
}

export { CountryFlag };
