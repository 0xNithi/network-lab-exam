/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import { FC, useCallback, useEffect, useState } from "react"
import AlertModal from "./AlertModal"

const Questions: FC<any> = (props) => {
  const { questions: questionsData, timeOutStatus } = props

  const router = useRouter()

  const [showAlertModal, setShowAlertModal] = useState<boolean>(false)

  const [questions, setQuestions] = useState(questionsData)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const choiceHandler = (value: any) => {
    let question = [...questions]
    question[currentQuestion] = {
      ...question[currentQuestion],
      answer: value,
    }
    setQuestions(question)
  }
  const textHandler = (event: any) => {
    let question = [...questions]
    question[currentQuestion] = {
      ...question[currentQuestion],
      answer: event.target.value,
    }
    setQuestions(question)
  }

  const submitHandler = useCallback(() => {
    let question = [...questions]
    fetch("https://network-lab-exam.vercel.app/api/submission", {
      method: "post",
      body: JSON.stringify({
        answer: JSON.stringify(
          question.reduce((prev, curr) => {
            if (curr.answer) {
              prev.push({
                id: curr.id,
                answer: curr.answer,
              })
            }
            return prev
          }, [])
        ),
      }),
    })
    localStorage.removeItem("data")
    router.push("/")
  }, [questions, router])

  useEffect(() => {
    if (timeOutStatus) {
      submitHandler()
    }
  }, [submitHandler, timeOutStatus])

  useEffect(() => {
    const data = localStorage.getItem("data")

    if (data) {
      setQuestions(JSON.parse(data).questions)
      setCurrentQuestion(JSON.parse(data).current)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "data",
      JSON.stringify({ questions, current: currentQuestion })
    )
  }, [questions, currentQuestion])

  useEffect(() => {
    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState === "hidden") {
        submitHandler()
      }
    })

    return () => {
      document.removeEventListener("visibilitychange", (event) => {
        if (document.visibilityState === "visible") {
          submitHandler()
        }
      })
    }
  }, [submitHandler])

  return (
    <>
      {showAlertModal && (
        <AlertModal
          title={`ยืนยันการส่งคำตอบ`}
          content={`หากส่งคำตอบไปเเล้ว จะไม่สามารถกลับมาเเก้ไขได้`}
          onAccept={submitHandler}
          onCancel={() => {
            setShowAlertModal(false)
          }}
        />
      )}
      <div className="container mx-auto my-24 space-y-6 text-xl">
        <div className="flex justify-between">
          {currentQuestion > 0 && (
            <button
              className="p-2 text-white bg-red-500 rounded focus:outline-none hover:bg-red-600 active:bg-red-700 text-md"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              ข้อก่อนหน้า
            </button>
          )}
          <div>
            {currentQuestion + 1} / {questions.length}
          </div>
          {currentQuestion < questions.length - 1 && (
            <button
              className="p-2 text-white bg-green-500 rounded focus:outline-none hover:bg-green-600 active:bg-green-700 text-md"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              ข้อถัดไป
            </button>
          )}
          {currentQuestion == questions.length - 1 && (
            <button
              className="p-2 bg-green-500 border rounded focus:outline-none hover:bg-green-600 active:bg-green-700"
              onClick={() => {
                setShowAlertModal(true)
              }}
            >
              ส่งคำตอบ
            </button>
          )}
        </div>
        <div className="text-center">
          <div className="flex flex-wrap justify-center">
            {questions.map((question: any, index: number) => (
              <button
                key={index}
                type="button"
                className={`flex justify-center items-center m-1 w-5 h-5 border rounded-full focus:outline-none text-xs hover:bg-blue-200 ${
                  currentQuestion == index
                    ? "bg-blue-700"
                    : question.answer
                    ? "bg-blue-500"
                    : "bg-white"
                }`}
                onClick={() => setCurrentQuestion(index)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col p-4 space-y-2 bg-white rounded-lg dark:bg-slate-700">
            <div className="font-bold">ข้อที่ {currentQuestion + 1}</div>
            <div className="whitespace-pre-wrap">
              {questions[currentQuestion].problem}
            </div>
          </div>
          {questions[currentQuestion].picture_url && (
            <div className="relative w-full h-full p-4 bg-white rounded-lg dark:bg-slate-700">
              <img
                src={`https://res.cloudinary.com/demo/image/fetch/${questions[currentQuestion].picture_url}`}
                alt={questions[currentQuestion].picture_url}
                className="mx-auto"
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          {questions[currentQuestion].choice ? (
            questions[currentQuestion].choice.map(
              (choice: any, index: number) => (
                <button
                  key={index}
                  className={`flex items-center p-2 rounded-lg space-x-6 w-full focus:outline-none ${
                    questions[currentQuestion].answer &&
                    questions[currentQuestion].answer == choice
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-slate-700"
                  }`}
                  onClick={() => choiceHandler(choice)}
                >
                  <div
                    className={`flex justify-center items-center w-10 h-10 rounded-full ${
                      questions[currentQuestion].answer &&
                      questions[currentQuestion].answer == choice
                        ? "bg-blue-400"
                        : ""
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-left whitespace-pre-wrap">
                    {choice}
                  </span>
                </button>
              )
            )
          ) : (
            <div className="flex items-center w-full rounded-lg">
              <textarea
                onChange={textHandler}
                className="w-full p-4 rounded-lg focus:outline-none"
                rows={7}
                placeholder="คำตอบ..."
                value={
                  questions[currentQuestion].answer
                    ? questions[currentQuestion].answer
                    : ""
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Questions
