import { Link } from "wouter";
import { Home, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
              <div className="bg-white/10 p-2 rounded-sm">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">RealtyCo</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Defining luxury living with curated properties that match your extraordinary lifestyle. We find more than houses; we find your legacy.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/listings" className="hover:text-accent transition-colors">Properties</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>123 Luxury Lane, Suite 100</li>
              <li>Beverly Hills, CA 90210</li>
              <li className="pt-2 hover:text-accent transition-colors cursor-pointer">+1 (555) 123-4567</li>
              <li className="hover:text-accent transition-colors cursor-pointer">info@realtyco.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white">Stay Connected</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} RealtyCo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
