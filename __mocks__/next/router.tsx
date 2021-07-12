export * from "next/router";
export { default } from "next/router";
export const useRouter = () => ({
  asPath: "/",
  events: {
    on() {},
    off() {},
  },
});
