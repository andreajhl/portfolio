type ScrollToTopOptions = { top?: number; behavior?: "auto" | "smooth" };
type ScrollToType = (options?: ScrollToTopOptions) => void;

const scrollToTop: ScrollToType = ({ top = 0, behavior = "smooth" } = {}) => {
  document?.documentElement?.scrollTo?.({ top, behavior });
};

export default scrollToTop;
