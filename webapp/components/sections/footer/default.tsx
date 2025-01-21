import { ModeToggle } from "../../ui/mode-toggle";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "../../ui/footer";
import { Activity } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="w-full bg-background">
      <div className="mx-auto max-w-container">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 mr-2" />
                <h3 className="text-xl font-bold">DiaCare Inc.</h3>
              </div>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Product</h3>
              <a
                href="/"
                className="text-sm text-muted-foreground"
              >
                Changelog
              </a>
              <a
                href="/"
                className="text-sm text-muted-foreground"
              >
                Documentation
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Company</h3>
              <a
                href="/"
                className="text-sm text-muted-foreground"
              >
                About
              </a>
              <a
                href="/"
                className="text-sm text-muted-foreground"
              >
                Careers
              </a>
              <a
                href="/"
                className="text-sm text-muted-foreground"
              >
                Blog
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Contact</h3>
              <a
                href="/"
                className="text-sm text-muted-foreground"
              >
                Facebook
              </a>
              <a
                href="/"
                className="text-sm text-muted-foreground"
              >
                Twitter
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Our Address</h3>
              <p className="text-sm text-muted-foreground">
                1234 Hovedgåde 
                <br />
                Copenhagen, 2300, Denmark
                <br />
                +45 1234 5678
              </p>
            </FooterColumn>
          </FooterContent>
          <FooterBottom>
            <div>© 2025 DiaCare Inc. All rights reserved</div>
            <div className="flex items-center gap-4">
              <a href="/">Privacy Policy</a>
              <a href="/">Terms of Service</a>
              <ModeToggle />
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
