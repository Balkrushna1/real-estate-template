import { Link } from "wouter";
import { Bed, Bath, Move, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Listing } from "@shared/schema";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <Link href={`/listings/${listing.id}`}>
      <Card className="group overflow-hidden border-border/60 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col rounded-sm">
        <div className="relative aspect-[4/3] overflow-hidden">
          {listing.isFeatured && (
            <Badge className="absolute top-4 left-4 z-10 bg-accent text-white border-none rounded-sm uppercase tracking-wider text-xs px-3 py-1 font-medium">
              Featured
            </Badge>
          )}
          <Badge className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white border-none rounded-sm uppercase text-xs px-3 py-1 font-medium">
            {listing.type}
          </Badge>
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span className="text-white font-medium text-sm">View Details →</span>
          </div>
        </div>
        
        <CardContent className="p-6 flex-grow">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-serif font-bold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
              {formatter.format(Number(listing.price))}
            </h3>
          </div>
          <h4 className="text-lg font-medium text-muted-foreground mb-4 line-clamp-1">
            {listing.title}
          </h4>
          
          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <MapPin className="h-4 w-4 mr-1 text-accent" />
            <span className="line-clamp-1">{listing.address}, {listing.city}</span>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 border-t border-border/40 mt-auto flex justify-between text-sm text-muted-foreground bg-secondary/20">
          <div className="flex items-center pt-4">
            <Bed className="h-4 w-4 mr-2" />
            <span>{listing.bedrooms} Beds</span>
          </div>
          <div className="flex items-center pt-4">
            <Bath className="h-4 w-4 mr-2" />
            <span>{listing.bathrooms} Baths</span>
          </div>
          <div className="flex items-center pt-4">
            <Move className="h-4 w-4 mr-2" />
            <span>{listing.sqft.toLocaleString()} Sqft</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
