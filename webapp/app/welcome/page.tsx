import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, BookOpen, TrendingUp } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Hi Dipendra, Good Day.</h1>
          <p className="text-muted-foreground">
          Analyze and manage all your diabetics needs at one place.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  Connected diabetes community members
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Resources
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">500+</div>
                <p className="text-xs text-muted-foreground">
                  Verified medical articles and guides
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Daily Activity
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">
                  Community engagement rate
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Growth
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.4%</div>
                <p className="text-xs text-muted-foreground">
                  Monthly user increase
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Latest Resources</CardTitle>
                <CardDescription>Recently added medical articles and guides</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="block hover:bg-muted p-2 rounded-lg transition-colors">
                      <div className="font-medium">Understanding Type 2 Diabetes</div>
                      <div className="text-sm text-muted-foreground">A comprehensive guide for newly diagnosed patients</div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block hover:bg-muted p-2 rounded-lg transition-colors">
                      <div className="font-medium">Nutrition Guidelines 2024</div>
                      <div className="text-sm text-muted-foreground">Updated dietary recommendations for diabetics</div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block hover:bg-muted p-2 rounded-lg transition-colors">
                      <div className="font-medium">Exercise and Blood Sugar</div>
                      <div className="text-sm text-muted-foreground">How physical activity affects your glucose levels</div>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Discussions</CardTitle>
                <CardDescription>Join these trending conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="block hover:bg-muted p-2 rounded-lg transition-colors">
                      <div className="font-medium">Managing Dawn Phenomenon</div>
                      <div className="text-sm text-muted-foreground">32 participants • Active now</div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block hover:bg-muted p-2 rounded-lg transition-colors">
                      <div className="font-medium">New CGM Experiences</div>
                      <div className="text-sm text-muted-foreground">18 participants • 5m ago</div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block hover:bg-muted p-2 rounded-lg transition-colors">
                      <div className="font-medium">Low-Carb Recipe Exchange</div>
                      <div className="text-sm text-muted-foreground">45 participants • 15m ago</div>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
                <CardDescription>Daily diabetes management advice</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>Check blood sugar before and after exercise</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Stay hydrated throughout the day</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <span>Keep a consistent meal schedule</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>Always carry fast-acting glucose</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}