import Navbar from "@/components/auth-route/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-x-hidden bg-[url('/dark-body-bg.jpg')] ">
      <Navbar />

      {children}
    </section>
  );
}
