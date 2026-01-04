import { type Product } from "@/hooks/use-products";
import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white p-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm shadow-sm">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-1 text-yellow-400">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium text-foreground/80">
            {product.rating.rate}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.rating.count})
          </span>
        </div>

        <h3 className="mb-2 font-display text-lg font-bold leading-tight text-foreground line-clamp-2" title={product.title}>
          {product.title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-1">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/50 pt-4">
          <span className="font-display text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          
          <Button 
            onClick={handleAddToCart}
            size="sm"
            className="rounded-full bg-foreground text-background hover:bg-primary hover:text-white transition-colors duration-300"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-sm border border-border/50">
      <div className="mb-4 aspect-[4/3] w-full animate-pulse rounded-xl bg-muted" />
      <div className="space-y-3 p-2">
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
        </div>
        <div className="mt-4 flex items-center justify-between pt-2">
          <div className="h-8 w-20 animate-pulse rounded bg-muted" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
