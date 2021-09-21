import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { MyHiringsCardsSection } from "desktop-app/components/my-hirings/my-hirings-cards-section";
import CategoryFilterDropdown from "desktop-app/components/search/category-filter-dropdown";
import { OrderByDropdown } from "desktop-app/components/search/order-by-dropdown";
import scrollToTop from "lib/utils/scrollToTop";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import {
  COMPLETED,
  EXPIRED,
  REJECTED,
  PAYED_BY_CLIENT,
  PAYED_BY_CLIENT_AND_REJECTED_BY_CELEBRITY,
  CANCELED,
} from "desktop-app/constants/contractStatuses";
import { defineMessages, FormattedMessage } from "react-intl";
import { useIntl } from "lib/custom-intl";
import { translateOptions, getOptionByValue } from "lib/utils/options-utils";

const messages = defineMessages({
  categoryFilterTitle: {
    defaultMessage: "Filtrar contratos",
  },
  createAtDescLabel: { defaultMessage: "Más recientes" },
  createAtAscLabel: { defaultMessage: "Más antiguos" },
  pendingFilterLabel: {
    defaultMessage: "Pendientes",
  },
  completedFilterLabel: {
    defaultMessage: "Entregados",
  },
  expiredFilterLabel: {
    defaultMessage: "Expirados",
  },
  rejectedFilterLabel: {
    defaultMessage: "Rechazados",
  },
  canceledFilterLabel: {
    defaultMessage: "Cancelados",
  },
});

const orderByOptions = [
  { label: messages.createAtDescLabel, value: "created_at desc" },
  { label: messages.createAtAscLabel, value: "created_at asc" },
];

const filterByOptions = [
  {
    label: messages.pendingFilterLabel,
    value: `${PAYED_BY_CLIENT},${PAYED_BY_CLIENT_AND_REJECTED_BY_CELEBRITY}`,
  },
  { label: messages.completedFilterLabel, value: `${COMPLETED}` },
  { label: messages.expiredFilterLabel, value: `${EXPIRED}` },
  { label: messages.rejectedFilterLabel, value: `${REJECTED}` },
  { label: messages.canceledFilterLabel, value: `${CANCELED}` },
];

type MyHiringsProps = { query: { [key: string]: any } };

function MyHirings({ query }: MyHiringsProps) {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const currentPage = parseFloat(query?.currentPage) || 1;
  const { orderBy, status } = query || {};

  function changeQueryParams(newQueryParams: { [key: string]: any }) {
    const { pathname, replace } = router;
    replace({ pathname, query: newQueryParams });
  }

  function setCurrentPage(newPage: number) {
    changeQueryParams(Object.assign({}, query, { currentPage: newPage }));
  }

  function updateCurrentPage(newPage: number) {
    scrollToTop({ behavior: "auto" }); // Con "smooth" realiza un salto debido al cambio de altura.
    setCurrentPage(newPage);
  }
  function updateOrderBy({ value }) {
    changeQueryParams({ orderBy: value });
  }
  function updateFilerByStatus(value) {
    changeQueryParams({ status: value });
  }

  const categoryFilterTitle = formatMessage(messages.categoryFilterTitle);
  const translatedFilterByOptions = translateOptions(
    filterByOptions,
    formatMessage
  );
  const translatedOrderByOptions = translateOptions(
    orderByOptions,
    formatMessage
  );
  const orderBySelectedOption = getOptionByValue(
    translatedOrderByOptions,
    orderBy
  );
  const hasFilteredByStatus = status && status !== "";
  const checkedFiltersValue = hasFilteredByStatus ? status?.split?.(",") : [];

  return (
    <PageContainer>
      <PageHeading>
        <span className="font-weight-bold mr-auto">
          <FormattedMessage defaultMessage="Mis solicitudes" />
        </span>
        <CategoryFilterDropdown
          className={styles.Dropdown}
          options={translatedFilterByOptions}
          title={categoryFilterTitle}
          checkedOptions={checkedFiltersValue}
          onChange={updateFilerByStatus}
        />
        <OrderByDropdown
          className={styles.Dropdown}
          options={translatedOrderByOptions}
          selectedOption={orderBySelectedOption}
          onChange={updateOrderBy}
        />
      </PageHeading>
      <main className={styles.MyHiringsMainContainer}>
        <MyHiringsCardsSection
          status={status}
          orderBy={orderBy}
          currentPage={currentPage}
          onChangePage={updateCurrentPage}
        />
      </main>
    </PageContainer>
  );
}

export { MyHirings };
