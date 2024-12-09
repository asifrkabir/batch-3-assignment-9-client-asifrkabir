import MainHeader from "@/components/Shared/Nav/MainHeader/MainHeader";
import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainHeader />
      <ScrollToTopButton />
      <div className="min-h-screen w-full p-8">{children}</div>
    </div>
  );
}
