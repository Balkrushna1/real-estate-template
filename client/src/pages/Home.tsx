import { Link } from "wouter";
import { ArrowRight, Star, Award, Users } from "lucide-react";
import { useListings } from "@/hooks/use-listings";
import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Home() {
  // Fetch only featured or recent listings for the home page in a real app
  // Here we just fetch all and slice for demo
  const { data: listings, isLoading } = useListings();

  const featuredListings = listings?.filter(l => l.isFeatured).slice(0, 3) || [];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash image: modern luxury home exterior dusk */}
          <img 
            src="https://images.unsplash.com/photo-1600596542815-e3289cab6f61?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-accent/20 backdrop-blur-md border border-accent/40 text-accent-foreground font-medium text-sm tracking-wide uppercase">
              Exclusive Real Estate
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
              Find Your Place in <br />
              <span className="text-accent italic">The Extraordinary</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Discover a curated collection of the world's most desirable properties. Where architecture meets art, and luxury knows no bounds.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/listings">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white min-w-[180px] h-14 text-lg rounded-sm">
                  Browse Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-primary min-w-[180px] h-14 text-lg rounded-sm bg-transparent backdrop-blur-sm">
                  Contact an Agent
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="space-y-2">
              <span className="text-accent font-medium tracking-wider uppercase text-sm">Curated Selection</span>
              <h2 className="text-4xl font-serif font-bold text-foreground">Featured Residences</h2>
            </div>
            <Link href="/listings">
              <Button variant="ghost" className="group mt-4 md:mt-0">
                View All Properties <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[300px] w-full rounded-sm" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredListings.map((listing) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <ListingCard listing={listing} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-4xl font-serif font-bold">12,000+</h3>
              <p className="text-primary-foreground/70">Happy Clients</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-4xl font-serif font-bold">15 Years</h3>
              <p className="text-primary-foreground/70">Of Excellence</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-4xl font-serif font-bold">$2.5B+</h3>
              <p className="text-primary-foreground/70">In Property Sales</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-serif font-bold mb-6 text-foreground">Ready to find your dream home?</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Our team of expert agents is ready to guide you through the journey of finding the perfect property that suits your lifestyle and aspirations.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white min-w-[200px] h-12 text-lg rounded-sm shadow-xl shadow-primary/20">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
