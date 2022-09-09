import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.cdnfonts.com/css/new-york-extra-large"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <script
            id="usercentrics-cmp"
            src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
            data-settings-id="Pk7B7XUJr"
            async
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
        <script src="https://checkout.freemius.com/checkout.min.js"></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"
          integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
      </Html>
    );
  }
}

export default MyDocument;
