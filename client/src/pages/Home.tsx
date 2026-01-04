import { useProducts } from "@/hooks/use-products";
import { ProductCard, ProductSkeleton } from "@/components/ProductCard";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

export default function Home() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="min-h-screen bg-muted/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-foreground py-20 text-white sm:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500 blur-[120px]" />
        </div>
        
        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
              <Sparkles className="h-8 w-8 text-yellow-300" />
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Curated Excellence <br />
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                For Modern Living
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Discover our hand-picked collection of premium products. 
              Quality meets style in every item we offer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              New Arrivals
            </h2>
            <p className="text-muted-foreground">
              Explore the latest additions to our store
            </p>
          </div>
          <div className="hidden items-center gap-2 text-sm font-medium text-primary sm:flex">
            <ShoppingBag className="h-4 w-4" />
            {products ? `${products.length} Products` : "Loading..."}
          </div>
        </div>

        {error ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-red-50 p-8 text-center text-red-600">
            <h3 className="mb-2 text-xl font-bold">Failed to load products</h3>
            <p className="opacity-80">{(error as Error).message}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : products?.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-white py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} LuxeStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
