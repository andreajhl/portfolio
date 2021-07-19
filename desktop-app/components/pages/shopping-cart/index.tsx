import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { ShoppingCartList } from "desktop-app/components/shopping-card/shopping-cart-list";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

function ShoppingCartPage() {
  return (
    <PageContainer showFooter={false}>
      <PageHeading>
        <FormattedMessage defaultMessage="Mi carrito de compra" />
      </PageHeading>
      <main className={styles.ShoppingCardPage}>
        <ShoppingCartList />
      </main>
    </PageContainer>
  );
}

export { ShoppingCartPage };
