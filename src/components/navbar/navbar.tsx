import NavItem from "@/components/navbar/nav-item";

export function FloatingNavbar() {
  return (
    <div className="fixed top-4 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-4">
      <NavItem />
    </div>
  );
}
