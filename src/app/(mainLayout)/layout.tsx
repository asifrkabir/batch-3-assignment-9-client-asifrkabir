import MainHeader from "@/components/Shared/Nav/MainHeader/MainHeader";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainHeader />
      {children}
    </div>
  );
}
