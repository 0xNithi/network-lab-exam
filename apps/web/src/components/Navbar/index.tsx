import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"
import { Auth } from "@supabase/ui"
import Image from "next/image"
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react"
import { Popover } from "react-tiny-popover"
import { Button } from "ui"
import { NetworkLabIcon } from "ui/icons/NetworkLabIcon"

import { supabase } from "../../utils/supabase"
import { ThemeSelector } from "./ThemeSelector"

const NavbarContainer: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-2 bg-blue-700 border-b border-blue-500 dark:bg-blue-900 dark:border-blue-700">
      <div className="container flex flex-row items-center justify-between mx-auto">
        {children}
      </div>
    </nav>
  )
}

export const Navbar: FC = () => {
  const { user } = Auth.useUser()

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleSignOut = useCallback(async () => {
    handleToggleMenu()
    await supabase.auth.signOut()
  }, [])

  const content = useMemo(() => {
    return (
      <div className="flex flex-col bg-white divide-y rounded shadow divide-slate-300 dark:divide-slate-600 dark:bg-slate-800">
        <div className="flex flex-row items-center p-2 space-x-4">
          {user?.user_metadata.avatar_url && (
            <Image
              src={`https://res.cloudinary.com/demo/image/fetch/${user?.user_metadata.avatar_url}`}
              alt={user?.user_metadata.full_name}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div>
            <p>{user?.user_metadata.full_name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <button
            className="flex flex-row px-4 py-2 space-x-4 rounded-b hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={handleSignOut}
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    )
  }, [
    handleSignOut,
    user?.email,
    user?.user_metadata.avatar_url,
    user?.user_metadata.full_name,
  ])

  return (
    <NavbarContainer>
      <NetworkLabIcon className="text-white" />
      <div className="flex flex-row items-center justify-between space-x-2">
        <ThemeSelector />
        <Popover
          isOpen={isMenuOpen}
          align="end"
          reposition={false}
          positions={["bottom"]}
          containerClassName="z-20"
          padding={4}
          content={content}
          onClickOutside={handleToggleMenu}
        >
          <div>
            <Button className="p-1" onClick={handleToggleMenu}>
              {user?.user_metadata.avatar_url && (
                <Image
                  src={`https://res.cloudinary.com/demo/image/fetch/${user?.user_metadata.avatar_url}`}
                  alt={user?.user_metadata.full_name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
            </Button>
          </div>
        </Popover>
      </div>
    </NavbarContainer>
  )
}
