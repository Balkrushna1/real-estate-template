import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Our Legacy</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light">
            Redefining the luxury real estate experience through integrity, innovation, and an unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-accent font-medium tracking-wider uppercase text-sm">Who We Are</span>
            <h2 className="text-4xl font-serif font-bold text-foreground">A Tradition of Trust</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2005, RealtyCo has established itself as the premier destination for luxury real estate. We don't just sell properties; we curate lifestyles. Our deep understanding of the high-end market allows us to connect extraordinary people with extraordinary homes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that true luxury is about more than just price—it's about the experience. From the first consultation to the final closing, our dedicated team provides white-glove service tailored to your unique needs.
            </p>
            <div className="pt-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Sig_generic.png" alt="Signature" className="h-12 opacity-50" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent rounded-sm z-0" />
            {/* Unsplash image: team meeting modern office */}
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
              alt="Our Team" 
              className="relative z-10 w-full rounded-sm shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Core Values</h2>
            <Separator className="w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Integrity", desc: "We operate with absolute transparency and honesty in every transaction." },
              { title: "Excellence", desc: "We strive for perfection in every detail, exceeding expectations." },
              { title: "Innovation", desc: "We embrace new technologies to provide the best possible service." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-sm shadow-sm border border-border/50 text-center hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-serif font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 container mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Work With The Best</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Our agents are more than just salespeople; they are trusted advisors with deep local knowledge and global reach.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-sm px-8">Contact Our Team</Button>
        </Link>
      </section>
    </div>
  );
}
