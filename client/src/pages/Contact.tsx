import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { useContactSubmit } from "@/hooks/use-listings";
import { insertContactSchema } from "@shared/schema";
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const mutation = useContactSubmit();

  const form = useForm<z.infer<typeof insertContactSchema>>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof insertContactSchema>) {
    try {
      await mutation.mutateAsync(data);
      toast({
        title: "Message Sent",
        description: "We've received your inquiry and will contact you shortly.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Whether you're looking to buy, sell, or simply have a question, our team of luxury real estate experts is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info Card */}
          <div className="bg-primary text-primary-foreground p-10 rounded-sm shadow-xl h-fit">
            <h2 className="text-2xl font-serif font-bold mb-8 text-white">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-sm">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Our Headquarters</h3>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    123 Luxury Lane, Suite 100<br />
                    Beverly Hills, CA 90210
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-sm">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-primary-foreground/70">
                    +1 (555) 123-4567 (Main)<br />
                    +1 (555) 987-6543 (Sales)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-sm">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-primary-foreground/70">
                    info@realtyco.com<br />
                    sales@realtyco.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-sm">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Office Hours</h3>
                  <p className="text-primary-foreground/70">
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-sm shadow-sm border border-border/50">
            <h2 className="text-2xl font-serif font-bold mb-6 text-primary">Send us a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-secondary/20 border-border/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-secondary/20 border-border/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} value={field.value || ""} className="bg-secondary/20 border-border/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="I'm interested in..." 
                          className="min-h-[150px] bg-secondary/20 border-border/50 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-medium"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </div>
  );
}
