import { GetServerSideProps, NextPage, NextPageContext } from "next"
import { NetworkLabIcon } from "ui"

import { supabase } from "../utils/supabase"
import HomeLayout from "../views/Home"
import Agreement from "../views/Home/Agreement"

interface HomePageProps {
  isSubmit: boolean
  isStart: boolean
}

const HomePage: NextPage<HomePageProps> = (props) => {
  const { isSubmit, isStart } = props
  return (
    <HomeLayout>
      <div className="flex flex-col items-center w-5/6 p-8 mx-auto mt-32 text-xl bg-white rounded dark:bg-slate-800 md:w-3/4 lg:w-2/4">
        <NetworkLabIcon className="dark:text-white" />
        <Agreement isSubmit={isSubmit} isStart={isStart} />
      </div>
    </HomeLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } }
  }

  const submission = await fetch(`http://localhost:3000/api/submission`, {
    headers: req!.headers as HeadersInit,
  }).then((res) => (res.status == 200 ? true : false))

  const started_at = await fetch(`http://localhost:3000/api/logs`, {
    headers: req!.headers as HeadersInit,
  }).then((res) => (res.status == 200 ? true : false))

  return {
    props: {
      isSubmit: submission,
      isStart: started_at,
    },
  }
}

export default HomePage