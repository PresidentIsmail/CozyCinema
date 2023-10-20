import Navbar from "@/components/auth-group/Navbar";
import Footer from "@/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-tr from-[#070739] to-[#060212] text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
