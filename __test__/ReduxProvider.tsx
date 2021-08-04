import { Provider } from "react-redux";
import { store } from "./reduxStore";

const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
