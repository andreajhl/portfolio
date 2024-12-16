
import Footer from '@components/footer';
import Navigation from '@components/navigation';
import Script from 'next/script';
import '@styles/globals.scss';

export const metadata = {
  title: 'Andrea Hernandez | Front End Developer',
  description: 'Soy Andrea Hernandez, Front End Developer con experiencia en React, Next.js y desarrollo de interfaces interactivas y optimizadas.',
  authors: [{ name: 'Andrea Hernandez' }],
  keywords: [
    'front end developer', 
    'React developer', 
    'Next.js developer', 
    'HTML CSS JavaScript',
    'front end portfolio',
    'software engineer',
    'web development',
  ],
  icons: {
    icon: '/assets/svg/brand.svg',
  },
  openGraph: {
    title: 'Andrea Hernandez | Front End Developer',
    description: 'Descubre mi trayectoria como Front End Developer: más de 3 años desarrollando interfaces web modernas y optimizadas con React y Next.js.',
    url: 'https://andrea-hernandez-dev.vercel.app',
    type: 'website',
    images: [
      {
        url: '/assets/img/brand.png',
        width: 630,
        height: 630,
        alt: 'Andrea Hernandez Front End Developer Portfolio',
      },
    ],
  },
};

const RootLayout = ({ children }) => (
  <html lang='es'>
    <head>
      <meta name='google-site-verification' content='k6bxfjL5kiTwNZ7Wf22So7HL7jJpmXAsv-vHI4f06oo' />
    </head>
    <body>
      <Script
        id='structured-data-person'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': 'Andrea Hernandez',
            'url': 'https://andrea-hernandez-dev.vercel.app',
            'jobTitle': 'Front End Developer',
            'sameAs': [
              'https://github.com/andreajhl',
              'https://www.linkedin.com/in/andreahernandez29/',
            ],
            'worksFor': {
              '@type': 'Organization',
              'name': 'AdGoat',
            },
            'description': 'Front End Developer especializada en React y Next.js con más de 3 años de experiencia desarrollando interfaces optimizadas.',
          }),
        }}
      />
      <Navigation />
        {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;
