import { GetServerSideProps, NextPage } from "next"

import { supabase } from "../utils/supabase"
import LoginLayout from "../views/Login"
import LoginForm from "../views/Login/LoginForm"

const LoginPage: NextPage = () => {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (user && user.email?.endsWith("@kmitl.ac.th")) {
    return { props: {}, redirect: { destination: "/" } }
  }

  return { props: {} }
}

export default LoginPage
