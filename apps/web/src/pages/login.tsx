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

export default LoginPage
