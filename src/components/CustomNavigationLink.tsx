import { NavLink, NavLinkProps } from "react-router";
import { Button } from "./ui/button";

export function CustomNavigationLink({
  children,
  ...props
}: NavLinkProps) {
  return (
    <Button asChild variant="link">
      <NavLink
        {...props}
        className="text-primary-foreground hover:text-primary-foreground-hover"
      >
        {children}
      </NavLink>
    </Button>
  );
}
