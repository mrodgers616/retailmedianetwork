import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center justify-between w-full", className)}
      {...props}
    >
      <div className="flex items-center space-x-4 lg:space-x-6">
        <Link
          href="/app"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/app" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/metrics"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/metrics" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Business Metrics
        </Link>
        <Link
          href="/collaborations"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/collaborations" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Collaborations
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        {pathname === "/app" && (
          <>
            <Button variant="outline">Connect Shopify</Button>
            <Button variant="outline">Connect Amazon</Button>
          </>
        )}
        {pathname !== "/find-partners" && (
          <Link href="/find-partners">
            <Button>Find Partners</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
