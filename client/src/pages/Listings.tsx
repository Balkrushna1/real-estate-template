import { useState } from "react";
import { useListings } from "@/hooks/use-listings";
import { ListingCard } from "@/components/ListingCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Listings() {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    priceRange: [0, 5000000]
  });

  const { data: listings, isLoading } = useListings({
    city: filters.search || undefined,
    type: filters.type === "all" ? undefined : filters.type as any,
    // Note: Slider logic would ideally map to actual min/max price API inputs
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1],
  });

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "all",
      priceRange: [0, 5000000]
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-2 mb-10">
          <h1 className="text-4xl font-serif font-bold text-primary">Property Collection</h1>
          <p className="text-muted-foreground">Browse our exclusive selection of premium properties.</p>
        </div>

        {/* Filters Bar - Desktop */}
        <div className="hidden lg:flex items-center space-x-4 bg-white p-4 rounded-sm shadow-sm border border-border mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by city..." 
              className="pl-9 border-none bg-transparent focus-visible:ring-0"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          
          <div className="h-8 w-[1px] bg-border mx-4" />
          
          <Select 
            value={filters.type} 
            onValueChange={(val) => setFilters(prev => ({ ...prev, type: val }))}
          >
            <SelectTrigger className="w-[180px] border-none bg-transparent focus:ring-0">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-8 w-[1px] bg-border mx-4" />

          <div className="w-[300px] px-4 space-y-2">
             <div className="flex justify-between text-xs text-muted-foreground">
               <span>Price Range</span>
               <span>${(filters.priceRange[0]/1000000).toFixed(1)}M - ${(filters.priceRange[1]/1000000).toFixed(1)}M+</span>
             </div>
             <Slider 
                defaultValue={[0, 5000000]} 
                max={10000000} 
                step={100000}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                className="py-2"
             />
          </div>

          <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear Filters">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Filters Trigger */}
        <div className="lg:hidden mb-8">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                <span>Filters</span>
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl">Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input 
                    placeholder="Search by city..." 
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select 
                    value={filters.type} 
                    onValueChange={(val) => setFilters(prev => ({ ...prev, type: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                     <span>Min Price</span>
                     <span>${(filters.priceRange[0]/1000000).toFixed(1)}M</span>
                  </div>
                  <Slider 
                    max={10000000} 
                    step={100000}
                    value={[filters.priceRange[0]]}
                    onValueChange={(val) => handlePriceChange([val[0], filters.priceRange[1]])}
                  />
                  <div className="flex justify-between text-sm">
                     <span>Max Price</span>
                     <span>${(filters.priceRange[1]/1000000).toFixed(1)}M</span>
                  </div>
                   <Slider 
                    max={10000000} 
                    step={100000}
                    value={[filters.priceRange[1]]}
                    onValueChange={(val) => handlePriceChange([filters.priceRange[0], val[0]])}
                  />
                </div>
                <Button className="w-full" onClick={clearFilters}>Reset All</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[300px] w-full rounded-sm" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
          </div>
        ) : listings?.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-sm border border-border/50">
            <h3 className="text-xl font-medium text-muted-foreground">No properties found matching your criteria.</h3>
            <Button variant="link" onClick={clearFilters} className="mt-2 text-primary">Clear all filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings?.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
