import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// Schema for product validation
const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

export type Product = z.infer<typeof ProductSchema>;

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // Intentionally slowing down slightly to show off the beautiful skeletons
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      
      // Validate array of products
      return z.array(ProductSchema).parse(data);
    },
  });
}
