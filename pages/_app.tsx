import "@mantine/core/styles.css";
import Head from "next/head";
import { useState } from 'react';
import { MantineProvider, Button } from "@mantine/core";
import { theme } from "../theme";

export default function App({ Component, pageProps }: any) {
  const [colorScheme, setColorScheme] = useState('light');

  const toggleColorScheme = () => setColorScheme(colorScheme === 'light' ? 'dark' : 'light');

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Music Mode</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
