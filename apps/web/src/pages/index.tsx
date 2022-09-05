import { GetServerSideProps, NextPage } from "next"
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
  try {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
      return { props: {}, redirect: { destination: "/login" } }
    }
  } catch (error) {
    return { props: {}, redirect: { destination: "/login" } }
  }

  const submission = await fetch(
    `https://network-lab-exam.vercel.app/api/submission`,
    {
      headers: req!.headers as HeadersInit,
    }
  ).then((res) => (res.status == 200 ? true : false))

  const started_at = await fetch(
    `https://network-lab-exam.vercel.app/api/logs`,
    {
      headers: req!.headers as HeadersInit,
    }
  ).then((res) => (res.status == 200 ? true : false))

  return {
    props: {
      isSubmit: submission,
      isStart: started_at,
    },
  }
}

export default HomePage
