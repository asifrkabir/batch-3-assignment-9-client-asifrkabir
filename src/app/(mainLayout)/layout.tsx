import MainHeader from "@/components/Shared/Nav/MainHeader/MainHeader";
import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";
import { CartProvider } from "@/context/cart.provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CartProvider>
        <MainHeader />
        <ScrollToTopButton />
        <div className="min-h-screen w-full p-8">{children}</div>
      </CartProvider>
    </div>
  );
}
