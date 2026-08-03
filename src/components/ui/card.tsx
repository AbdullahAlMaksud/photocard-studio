import * as React from "react";

import { cn } from "@/lib/utils";

const Card = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="card"
    className={cn(
      "flex flex-col gap-4 rounded-xl border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-header" className={cn("flex flex-col gap-1 px-5 pt-5", className)} {...props} />
);

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="card-title"
    className={cn("text-sm leading-none font-semibold tracking-tight", className)}
    {...props}
  />
);

const CardDescription = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-description" className={cn("text-xs text-muted-foreground", className)} {...props} />
);

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-content" className={cn("px-5 pb-5", className)} {...props} />
);

const CardFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="card-footer" className={cn("flex items-center px-5 pb-5", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
