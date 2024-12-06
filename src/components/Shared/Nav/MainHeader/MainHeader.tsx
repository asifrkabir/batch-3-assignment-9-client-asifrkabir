import Link from "next/link";
import MainMobileNavbar from "../MainMobileNavbar/MainMobileNavbar";
import MainNavbar from "../MainNavbar/MainNavbar";

export default function MainHeader() {
  return (
    <header className="sticky top-0 w-full border-b bg-background px-4">
      <div className="h-14 flex items-center">
        {/* Desktop */}
        <MainNavbar />

        {/* Mobile */}
        <MainMobileNavbar />

        {/* Desktop & mobile */}
        <h1 className="flex items-center justify-end flex-1">
          <Link href="/">some social media icons</Link>
        </h1>
      </div>
    </header>
  );
}
