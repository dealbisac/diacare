import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, BookOpen, TrendingUp } from "lucide-react"
import WelcomePage from "./welcome/page"
import Footer from "@/components/footer"
import FooterSection from "@/components/sections/footer/default"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <WelcomePage />
      <FooterSection />
    </div>
  )
}