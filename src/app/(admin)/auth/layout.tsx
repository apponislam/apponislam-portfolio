import { AdminHeader } from "@/components/admin/AdminHeader";
import { PremiumFooter } from "@/components/premium-footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Appon Islam",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-between">
      <div className="mx-3 md:mx-0">
        <AdminHeader />
        <main className="my-8">{children}</main>
      </div>
      <PremiumFooter />
    </div>
  );
}
