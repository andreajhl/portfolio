import { withAuthenticationRequired } from "lib/famosos-auth";
import { ShoppingCartPage } from "desktop-app/components/pages/shopping-cart";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import LoadingPage from "react-app/src/components/layouts/loading-page";

function ShoppingCart() {
  useDesktopClass(true);

  return (
    <>
      <CustomHead />
      <ShoppingCartPage />
    </>
  );
}

export default withAuthenticationRequired(ShoppingCart, {
  onRedirecting: LoadingPage,
});
