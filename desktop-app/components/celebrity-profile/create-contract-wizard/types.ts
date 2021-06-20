import { celebrityType } from "desktop-app/types/celebrityType";

export type ComponentProps = {
  className?: string;
  celebrity: celebrityType;
  contractInProgress?: null | {
    [key: string]: any;
  };
};
