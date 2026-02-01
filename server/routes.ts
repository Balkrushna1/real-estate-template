import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.listings.list.path, async (req, res) => {
    try {
      const input = api.listings.list.input?.parse(req.query);
      const listings = await storage.getListings(input);
      res.json(listings);
    } catch (error) {
       // Handle cases where validation fails gracefully or if input is undefined (optional schema)
       const listings = await storage.getListings();
       res.json(listings);
    }
  });

  app.get(api.listings.get.path, async (req, res) => {
    const listing = await storage.getListing(Number(req.params.id));
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json(listing);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.submitContact(input);
      res.json({ success: true, message: "Thank you for contacting us! We will get back to you soon." });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
