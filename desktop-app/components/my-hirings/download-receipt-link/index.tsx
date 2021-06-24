import { FAMOSOS_PHONE_NUMBER } from "constants/phoneNumbers";
import { getWhatsappMessageToNumberLink } from "lib/utils/getSocialMediaLink";
import { HTMLAttributes } from "react";
import { RootState } from "react-app/src/state/store";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { connect, ConnectedProps } from "react-redux";
import { contractIsCancelled } from "desktop-app/constants/contractStatuses";

const messages = defineMessages({
  paymentReceiptWhatsappMessage: {
    defaultMessage:
      "Me gustaría solicitar el comprobante de pago de mi contrato con la referencia {contractReference}",
  },
  refundReceiptWhatsappMessage: {
    defaultMessage:
      "Me gustaría solicitar el comprobante de devolución de mi contrato con la referencia {contractReference}",
  },
});

function LinkText({
  receiptUrl,
  isRefundReceipt,
}: {
  receiptUrl: string;
  isRefundReceipt: boolean;
}) {
  if (receiptUrl && isRefundReceipt) {
    return (
      <FormattedMessage defaultMessage="Descargar comprobante de devolución" />
    );
  }
  if (receiptUrl && !isRefundReceipt) {
    return <FormattedMessage defaultMessage="Descargar comprobante de pago" />;
  }
  if (!receiptUrl && isRefundReceipt) {
    return (
      <FormattedMessage defaultMessage="Solicitar comprobante de devolución" />
    );
  }

  return <FormattedMessage defaultMessage="Solicitar comprobante de pago" />;
}

const mapStateToProps = (
  { session: { getReceiptsUrlsReducer } }: RootState,
  { contractId }
) => ({
  receiptUrl: getReceiptsUrlsReducer?.data?.results?.[contractId]?.url,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type DownloadReceiptLinkProps = {
  contractId: number;
  contractReference: string;
  contractStatus: number;
} & HTMLAttributes<HTMLAnchorElement> &
  PropsFromRedux;

function DownloadReceiptLink({
  contractId,
  contractReference,
  contractStatus,
  receiptUrl,
  ...anchorProps
}: DownloadReceiptLinkProps) {
  const { formatMessage } = useIntl();
  const isRefundReceipt = contractIsCancelled(contractStatus);

  const whatsappMessageLink = getWhatsappMessageToNumberLink(
    FAMOSOS_PHONE_NUMBER,
    formatMessage(
      isRefundReceipt
        ? messages.refundReceiptWhatsappMessage
        : messages.paymentReceiptWhatsappMessage,
      { contractReference }
    )
  );

  const anchorHref = receiptUrl || whatsappMessageLink;

  return (
    <a
      href={anchorHref}
      target="_blank"
      rel="noopener noreferrer"
      {...anchorProps}
    >
      <LinkText receiptUrl={receiptUrl} isRefundReceipt={isRefundReceipt} />
    </a>
  );
}

const _DownloadReceiptLink = connector(DownloadReceiptLink);

export { _DownloadReceiptLink as DownloadReceiptLink };
