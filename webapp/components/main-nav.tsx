"use client"

import Link from "next/link"
import { Activity, MessageCircle, Search, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()
  
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Button
        variant="ghost"
        className={cn(
          "hover:bg-muted hover:text-primary",
          pathname === "/dashboard" && "bg-muted"
        )}
        asChild
      >
        <Link href="/dashboard">
          <Activity className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "hover:bg-muted hover:text-primary",
          pathname === "/chat" && "bg-muted"
        )}
        asChild
      >
        <Link href="/chat">
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "hover:bg-muted hover:text-primary",
          pathname === "/resources" && "bg-muted"
        )}
        asChild
      >
        <Link href="/resources">
          <BookOpen className="h-4 w-4 mr-2" />
          Resources
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "hover:bg-muted hover:text-primary",
          pathname === "/search" && "bg-muted"
        )}
        asChild
      >
        <Link href="/search">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Link>
      </Button>
    </nav>
  )
}