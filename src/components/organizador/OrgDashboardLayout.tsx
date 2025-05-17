import { ReactNode } from "react";
import OrgSidebar from "./OrgSidebar";

interface OrgDashboardLayoutProps {
  children: ReactNode;
}

export function OrgDashboardLayout({ children }: OrgDashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50">
      <OrgSidebar />
      <div className="flex-1 overflow-auto">
        <main className="container mx-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default OrgDashboardLayout;
