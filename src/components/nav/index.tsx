import { Container } from "@/components/container";
import { Logo } from "./logo";
import { DesktopNav } from "./desktop-nav";
import { AuthButtons } from "./auth-buttons";
import { MobileNav } from "./mobile-nav";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-40 w-full backdrop-blur-md">
      <Container className="flex flex-row items-center gap-4 mx-auto min-h-20 lg:grid lg:grid-cols-3">
        <Logo />
        <DesktopNav />
        <AuthButtons />
        <MobileNav />
      </Container>
    </header>
  );
};
