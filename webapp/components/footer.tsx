import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container max-w-7xl py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="grid gap-2">
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                About
              </Link>
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                Services
              </Link>
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                Contact
              </Link>
            </nav>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>123 St. Hovedgåde</p>
                <p>Noglebyen, Copenhagen 1234</p>
                <p>Phone: (+45) 2345678</p>
                <p>Email: info@diacare.dk</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          <p>&copy; 2025 Diacare Copenhagen Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}