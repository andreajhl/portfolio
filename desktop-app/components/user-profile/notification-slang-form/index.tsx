import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => state;

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type NotificationSlangFormProps = StateProps & DispatchProps;
// TODO: conectar con endpoint creado en branch master
function NotificationSlangForm(props: NotificationSlangFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);
  return (
    <div className={styles.NotificationSlangFormContainer}>
      <label htmlFor="notifications_slang_select">
        Idioma de la página <br></br> y notificaciones
      </label>
      {!isLoading ? (
        <select
          className={styles.NotificationsSlangFormSelect}
          name="notifications_slang"
          id="notifications_slang_select"
        >
          <option value="es">Español</option>
          <option value="en">Ingles</option>
        </select>
      ) : (
        <Skeleton height={40} width={156} />
      )}
    </div>
  );
}

export default NotificationSlangForm;

const _NotificationSlangForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationSlangForm);

export { _NotificationSlangForm as NotificationSlangForm };
