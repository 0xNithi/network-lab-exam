import { FC, PropsWithChildren } from "react"

import { Navbar } from "../../components/Navbar"
import useRedirectAuth from "../../hooks/useRedirectAuth"

const ExamLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  useRedirectAuth()

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default ExamLayout
