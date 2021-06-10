import { celebrityType } from "desktop-app/types/celebrityType";

export type ComponentProps = {
  celebrity: celebrityType;
  contractInProgress?: null | {
    [key: string]: any;
  };
};
