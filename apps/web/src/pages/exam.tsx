import { GetServerSideProps, NextPage } from "next"
import { useState } from "react"

import { supabase } from "../utils/supabase"
import ExamLayout from "../views/Exam"
import Countdown from "../views/Exam/Countdown"
import Questions from "../views/Exam/Questions"

interface ExamPageProps {
  questions: any[]
  startTime: any
}

const ExamPage: NextPage<ExamPageProps> = (props) => {
  const { questions, startTime } = props

  const [timeOutStatus, setTimeOutStatus] = useState(false)
  const timOutStatusHandler = () => {
    setTimeOutStatus(true)
  }
  return (
    <ExamLayout>
      <Questions questions={questions} timeOutStatus={timeOutStatus} />
      <Countdown startTime={startTime} onTimeOut={timOutStatusHandler} />
    </ExamLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } }
  }

  const submission = await fetch(
    `https://network-lab-exam.vercel.app/api/submission`,
    {
      headers: req!.headers as HeadersInit,
    }
  ).then((res) => (res.status == 200 ? res.json() : null))

  if (submission !== null) {
    return { props: {}, redirect: { destination: "/" } }
  }

  const { started_at } = await fetch(
    `https://network-lab-exam.vercel.app/api/logs`,
    {
      headers: req!.headers as HeadersInit,
    }
  ).then(async (res) =>
    res.status == 200
      ? res.json()
      : await fetch(`https://network-lab-exam.vercel.app/api/logs`, {
          method: "POST",
          headers: req!.headers as HeadersInit,
        }).then((res) => res.json())
  )

  const questions = await (
    await fetch(`https://network-lab-exam.vercel.app/api/questions`, {
      headers: req!.headers as HeadersInit,
    })
  ).json()

  return {
    props: {
      questions,
      startTime: started_at,
    },
  }
}

export default ExamPage
