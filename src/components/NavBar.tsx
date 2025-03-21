import { CustomNavigationLink as NavLink} from "./CustomNavigationLink";
import { ModeToggle } from "./ModeToggle";

export function NavBar() {
  return (
    <div className="w-full px-28 py-6 fixed top-0 left-0">
      <nav className="w-full bg-primary px-16 py-4 flex items-center justify-between rounded-full">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/event-driven">Event-Driven</NavLink>
        <NavLink to="/callbacks">Callbacks</NavLink>
        <ModeToggle />
      </nav>
    </div>
  );
}
