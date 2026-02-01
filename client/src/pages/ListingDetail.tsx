import { useRoute, Link } from "wouter";
import { useListing } from "@/hooks/use-listings";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bed, Bath, Move, MapPin, Share2, Heart, ArrowLeft, Check, 
  Calendar, Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ListingDetail() {
  const [, params] = useRoute("/listings/:id");
  const id = parseInt(params?.id || "0");
  const { data: listing, isLoading, error } = useListing(id);
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Property link copied to clipboard.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Saved",
      description: "Property added to your favorites.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 space-y-8">
        <Skeleton className="h-[60vh] w-full rounded-md" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-serif font-bold">Property Not Found</h2>
        <Link href="/listings">
          <Button variant="outline">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Full Width Image Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img 
          src={listing.imageUrl} 
          alt={listing.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-24 left-4 lg:left-8 z-20">
          <Link href="/listings">
            <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur-md hover:bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <div className="bg-card p-8 rounded-sm shadow-xl border border-border/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="outline" className="text-primary border-primary">{listing.type}</Badge>
                    {listing.isFeatured && <Badge className="bg-accent text-white border-none">Featured</Badge>}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">{listing.title}</h1>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 text-accent" />
                    {listing.address}, {listing.city}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <div className="text-3xl font-bold text-primary font-serif">
                    {formatter.format(Number(listing.price))}
                  </div>
                  <div className="text-sm text-muted-foreground">Price upon request</div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-sm">
                  <Bed className="h-6 w-6 text-primary mb-2" />
                  <span className="font-bold text-lg">{listing.bedrooms}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-sm">
                  <Bath className="h-6 w-6 text-primary mb-2" />
                  <span className="font-bold text-lg">{listing.bathrooms}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-sm">
                  <Move className="h-6 w-6 text-primary mb-2" />
                  <span className="font-bold text-lg">{listing.sqft.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Square Ft</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card p-8 rounded-sm shadow-sm border border-border/50">
              <h2 className="text-2xl font-serif font-bold mb-4">About this Property</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
              
              <h3 className="text-xl font-serif font-bold mt-8 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                 {/* Mock amenities since they aren't in schema */}
                 {["Smart Home System", "Wine Cellar", "Infinity Pool", "Private Gym", "Home Theater", "Gated Security"].map((item) => (
                   <div key={item} className="flex items-center text-sm text-muted-foreground">
                     <Check className="h-4 w-4 mr-2 text-accent" /> {item}
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-card p-6 rounded-sm shadow-sm border border-border/50 flex space-x-4">
              <Button variant="outline" className="flex-1" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleSave}>
                <Heart className="h-4 w-4 mr-2" /> Save
              </Button>
            </div>

            {/* Agent Contact Card */}
            <div className="bg-primary text-primary-foreground p-8 rounded-sm shadow-xl relative overflow-hidden">
               {/* Decorative circle */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
               
               <div className="relative z-10">
                 <h3 className="text-xl font-serif font-bold mb-6">Interested in this property?</h3>
                 
                 <div className="flex items-center space-x-4 mb-6">
                   <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent">
                     <span className="font-serif font-bold text-xl text-accent">RC</span>
                   </div>
                   <div>
                     <div className="font-bold text-lg">RealtyCo Sales</div>
                     <div className="text-accent text-sm">Luxury Specialists</div>
                   </div>
                 </div>

                 <div className="space-y-4 text-sm text-primary-foreground/80 mb-8">
                   <div className="flex items-center">
                     <Calendar className="h-4 w-4 mr-3 text-accent" /> Request a private tour
                   </div>
                   <div className="flex items-center">
                     <Shield className="h-4 w-4 mr-3 text-accent" /> Verified Listing
                   </div>
                 </div>

                 <Link href="/contact">
                   <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                     Contact Agent
                   </Button>
                 </Link>
                 <Button variant="outline" className="w-full mt-3 border-white/20 text-white hover:bg-white/10 hover:text-white">
                   Schedule Viewing
                 </Button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
