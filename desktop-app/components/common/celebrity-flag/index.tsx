import { celebrityType } from "desktop-app/types/celebrityType";

type CelebrityFlagProps = {
  width?: number;
  className?: string;
} & Pick<celebrityType, "alpha2Code">;

function CelebrityFlag({
  alpha2Code,
  width = 20,
  className = ""
}: CelebrityFlagProps) {
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

export { CelebrityFlag };
