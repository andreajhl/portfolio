import React, { ReactNode } from "react";
import Head from "next/head";

type CustomHeadProps = {
  children?: ReactNode;
  title?: string;
  description?: string;
  ogUrl?: string;
  ogImage?: string;
  ogVideo?: string;
};

const CustomHead = ({
  title = "Famosos.com - Videos personalizados de tus famosos favoritos.",
  description = "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.",
  ogUrl = "https://www.famosos.com",
  ogImage = "https://www.famosos.com/assets/img/famosos-share-img.jpg",
  ogVideo = "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5",
  children
}: CustomHeadProps) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <title key="title">{title}</title>
      <meta property="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:video" content={ogVideo} />
      <meta property="og:video:url" content={ogVideo} />
      <meta property="og:video:secure_url" content={ogVideo} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {children}
    </Head>
  );
};

export default CustomHead;
