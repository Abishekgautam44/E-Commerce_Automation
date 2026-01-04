import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { ShoppingBag, LogOut, User as UserIcon, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const { data: user, isLoading } = useUser();
  const { mutate: logout } = useLogout();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-purple-600 text-white shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            LuxeStore
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <>
              <div className="hidden items-center gap-3 rounded-full border border-border bg-white px-4 py-1.5 shadow-sm sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserIcon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {user.username}
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => logout()}
                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            location !== "/auth" && (
              <Link href="/auth">
                <Button className="rounded-full bg-primary px-6 font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
