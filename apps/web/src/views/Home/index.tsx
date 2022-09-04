import { FC, PropsWithChildren } from "react"

import { Navbar } from "../../components/Navbar"
import useRedirectAuth from "../../hooks/useRedirectAuth"

const HomeLayout: FC<PropsWithChildren<unknown>> = (props) => {
  const { children } = props

  useRedirectAuth()

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default HomeLayout
