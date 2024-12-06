import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function MainNavbar() {
  return (
    <div className="hidden md:flex">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image src={logo} alt="logo" width={40} height={40} priority />
      </Link>
      <nav className="flex items-center gap-3 lg:gap-4 ml-8 ">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
      </nav>
    </div>
  );
}
