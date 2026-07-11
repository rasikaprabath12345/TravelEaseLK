// Admin pages manage their own Navbar — no public Navbar/Footer here.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
