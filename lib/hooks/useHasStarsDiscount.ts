import useDiscountStarsSelected from "lib/hooks/useDiscountStarsSelected";

export function useHasStarsDiscount() {
  const starsSelected = useDiscountStarsSelected()[0];
  return starsSelected > 0;
}
