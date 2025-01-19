import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Activity } from "lucide-react"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
      <Link href="/">
        <div className="flex items-center space-x-2 mr-4">
          <Activity className="h-6 w-6" />
          <span className="font-bold">DiaCare</span>
        </div>
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}