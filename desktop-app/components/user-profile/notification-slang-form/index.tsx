import React from "react";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => state;

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type NotificationSlangFormProps = StateProps & DispatchProps;
// TODO: conectar con endpoint creado en branch master
function NotificationSlangForm(props: NotificationSlangFormProps) {
  return (
    <div className={styles.NotificationSlangFormContainer}>
      <label htmlFor="notifications_slang_select">
        Idioma de Notificaciones:
      </label>
      <select
        className={styles.NotificationsSlangFormSelect}
        name="notifications_slang"
        id="notifications_slang_select"
      >
        <option value="es">Español</option>
        <option value="en">Ingles</option>
      </select>
    </div>
  );
}

export default NotificationSlangForm;

const _NotificationSlangForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationSlangForm);

export { _NotificationSlangForm as NotificationSlangForm };
