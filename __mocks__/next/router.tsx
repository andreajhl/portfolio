export * from "next/router";
export { default } from "next/router";
export const useRouter = () => ({
  locale: "es",
  locales: ["es"],
  asPath: "/",
  events: {
    on() {},
    off() {},
  },
});
