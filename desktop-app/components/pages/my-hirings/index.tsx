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
  PAYED_BY_CLIENT,
  REJECTED,
  PENDING_TO_PAY,
} from "desktop-app/constants/contractStatuses";
type MyHiringsProps = { query: { [key: string]: any } };

const orderByOptions = [
  { label: "Más recientes", value: "created_at desc" },
  { label: "Más antiguos", value: "created_at asc" },
];
const filterByOptions = [
  {
    label: "Todos",
    value: `${COMPLETED},${EXPIRED},${PAYED_BY_CLIENT},${REJECTED}`,
  },
  { label: "Pendientes", value: `${PENDING_TO_PAY}` },
  { label: "Expirados", value: `${EXPIRED}` },
  { label: "Rechazados", value: `${REJECTED}` },
];

const getSelectedOrderByOption = (orderByValue) =>
  orderByOptions.find(({ value }) => orderByValue === value);

function MyHirings({ query }: MyHiringsProps) {
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

  return (
    <PageContainer>
      <PageHeading>
        <span className="font-weight-bold mr-auto">Mis solicitudes</span>
        <CategoryFilterDropdown
          className={styles.Dropdown}
          options={filterByOptions}
          title={"Filtrar contratos"}
          onChange={updateFilerByStatus}
        />
        <OrderByDropdown
          className={styles.Dropdown}
          options={orderByOptions}
          selectedOption={getSelectedOrderByOption(orderBy)}
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
