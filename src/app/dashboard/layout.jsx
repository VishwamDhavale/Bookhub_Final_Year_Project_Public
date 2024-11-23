import App from "./SidebarItem";
import PageWrapper from "./page-wrapper";
import MarginWidthWrapper from "./margin-width-wrapper";
import Navbar from "@/components/ui/Navbar";
export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <nav>
      <section>
        <div className="flex  ">
          <App />
          <MarginWidthWrapper>
            <PageWrapper>
              <Navbar /> {children}
            </PageWrapper>
          </MarginWidthWrapper>
        </div>
      </section>
    </nav>
  );
}
