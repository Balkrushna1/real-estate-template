import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

// Helper to construct query params
function buildQueryParams(params?: z.infer<typeof api.listings.list.input>) {
  if (!params) return "";
  const query = new URLSearchParams();
  if (params.minPrice) query.append("minPrice", params.minPrice.toString());
  if (params.maxPrice) query.append("maxPrice", params.maxPrice.toString());
  if (params.city) query.append("city", params.city);
  if (params.type) query.append("type", params.type);
  return `?${query.toString()}`;
}

export function useListings(filters?: z.infer<typeof api.listings.list.input>) {
  return useQuery({
    queryKey: [api.listings.list.path, filters],
    queryFn: async () => {
      const url = api.listings.list.path + buildQueryParams(filters);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch listings");
      return api.listings.list.responses[200].parse(await res.json());
    },
  });
}

export function useListing(id: number) {
  return useQuery({
    queryKey: [api.listings.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.listings.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch listing");
      return api.listings.get.responses[200].parse(await res.json());
    },
    enabled: !isNaN(id),
  });
}

export function useContactSubmit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.contact.submit.input>) => {
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.submit.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      return api.contact.submit.responses[200].parse(await res.json());
    },
  });
}
