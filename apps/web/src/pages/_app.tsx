import { Auth } from "@supabase/ui"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useEffect } from "react"

import "../styles/globals.css"
import { supabase } from "../utils/supabase"

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        })
      }
    )

    return () => {
      if (authListener) {
        authListener.unsubscribe()
      }
    }
  }, [])

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <ThemeProvider
        attribute="class"
        storageKey="theme_mode"
        defaultTheme="system"
      >
        <Head>
          <title>Network Laboratory Exam</title>
          <meta charSet="UTF-8" />
          <meta name="description" content="Network Lab Exam" />
          <meta name="keywords" content="Network Lab Exam" />
          <meta name="author" content="Network Lab Member" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </Auth.UserContextProvider>
  )
}

export default MyApp
