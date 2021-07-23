import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { ShoppingCartList } from "desktop-app/components/shopping-card/shopping-cart-list";
import styles from "./styles.module.scss";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  pageHeadingTitle: {
    defaultMessage: "Mi carrito de compra",
  },
});

function ShoppingCartPage() {
  const { formatMessage } = useIntl();
  const pageHeadingTitle = formatMessage(messages.pageHeadingTitle);

  return (
    <PageContainer showFooter={false}>
      <PageHeading children={pageHeadingTitle} />
      <main className={styles.ShoppingCardPage}>
        <ShoppingCartList />
      </main>
    </PageContainer>
  );
}

export { ShoppingCartPage };
