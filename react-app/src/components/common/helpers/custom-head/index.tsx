import React, { ReactNode } from "react";
import Head from "next/head";
import { defineMessages, MessageDescriptor, useIntl } from "react-intl";

const CustomHeadDefaultStrings = defineMessages({
  defaultTitle: {
    defaultMessage:
      "Famosos.com - Videos personalizados de tus famosos favoritos.",
  },
  defaultDescription: {
    defaultMessage:
      "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.",
  },
});
type CustomHeadProps = {
  children?: ReactNode;
  title?: MessageDescriptor | string;
  description?: MessageDescriptor | string;
  ogUrl?: string;
  ogImage?: string;
  ogVideo?: string;
};

const CustomHead = ({
  title = CustomHeadDefaultStrings.defaultTitle,
  description = CustomHeadDefaultStrings.defaultDescription,
  ogUrl = "https://www.famosos.com",
  ogImage = "https://www.famosos.com/assets/img/famosos-share-img.jpg", // la url relativa no funciona para Twitter TODO: implementar una mejor solucion
  ogVideo = "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5",
  children,
}: CustomHeadProps) => {
  const { formatMessage } = useIntl();

  const getTextInValidFormat = (text: string | MessageDescriptor) => {
    if (typeof text === "string") return text;
    return formatMessage(text);
  };

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <title key="title">{getTextInValidFormat(title)}</title>
      <meta name="description" content={getTextInValidFormat(description)} />

      <meta property="og:title" content={getTextInValidFormat(title)} />
      <meta
        property="og:description"
        content={getTextInValidFormat(description)}
      />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:video" content={ogVideo} />
      <meta property="og:video:url" content={ogVideo} />
      <meta property="og:video:secure_url" content={ogVideo} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={ogUrl} />
      <meta name="twitter:title" content={getTextInValidFormat(title)} />
      <meta
        name="twitter:description"
        content={getTextInValidFormat(description)}
      />
      <meta name="twitter:image" content={ogImage} />
      {children}
    </Head>
  );
};

export default CustomHead;
