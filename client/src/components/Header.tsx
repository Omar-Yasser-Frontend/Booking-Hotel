import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Profile from "./Profile";

function Header() {
  return (
    <header className="bg-base shadow-xl">
      <div className="container mx-auto flex h-[84px] flex-wrap items-center gap-3 p-4 text-white sm:gap-8">
        <Logo />
        <NavLinks />
        <Profile />
      </div>
    </header>
  );
}

export default Header;
