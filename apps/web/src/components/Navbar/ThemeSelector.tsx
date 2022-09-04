import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import { FC, useState } from "react"
import { Popover } from "react-tiny-popover"
import { Button } from "ui"

export const ThemeSelector: FC = () => {
  const { theme, setTheme } = useTheme()

  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState<boolean>(false)

  const handleSelectTheme = (select: string) => {
    return () => {
      setTheme(select)
      setIsThemeSelectorOpen(false)
    }
  }

  const handleToggleThemeSelector = () => {
    setIsThemeSelectorOpen((prev) => !prev)
  }

  const content = () => {
    return (
      <div className="flex flex-col bg-white divide-y rounded shadow divide-slate-300 dark:divide-slate-600 dark:bg-slate-800">
        <button
          className="flex flex-row px-4 py-2 space-x-4 rounded-t hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={handleSelectTheme("light")}
        >
          <SunIcon className="w-6 h-6" />
          <span>Light</span>
        </button>
        <button
          className="flex flex-row px-4 py-2 space-x-4 hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={handleSelectTheme("dark")}
        >
          <MoonIcon className="w-6 h-6" />
          <span>Dark</span>
        </button>
        <button
          className="flex flex-row px-4 py-2 space-x-4 rounded-b hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={handleSelectTheme("system")}
        >
          <ComputerDesktopIcon className="w-6 h-6" />
          <span>System</span>
        </button>
      </div>
    )
  }

  const renderThemeIcon = () => {
    switch (theme) {
      case "light":
        return <SunIcon className="w-5 h-5" />
      case "dark":
        return <MoonIcon className="w-5 h-5" />
      case "system":
        return <ComputerDesktopIcon className="w-5 h-5" />
      default:
        return <ComputerDesktopIcon className="w-5 h-5" />
    }
  }

  return (
    <Popover
      isOpen={isThemeSelectorOpen}
      align="end"
      reposition={false}
      positions={["bottom"]}
      containerClassName="z-20"
      padding={4}
      content={content}
      onClickOutside={handleToggleThemeSelector}
    >
      <Button onClick={handleToggleThemeSelector}>{renderThemeIcon()}</Button>
    </Popover>
  )
}
