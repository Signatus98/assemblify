// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* Título de la página */}
          <title>Assemblify</title>
          {/* Otros metadatos (opcional) */}
          <meta name="description" content="Organiza tu trabajo con Assemblify" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
