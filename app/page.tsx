import Landing from "@/components/landing/Landing";
import Navbar from "@/components/navbars/Navbar-1";
import Footer from "@/components/footers/Footer-1";
import Dashboard from "@/components/dashboard/Dashboard";
import { createClient } from "@/lib/utils/supabase/server";

import { appConfig } from "@/config";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div data-theme={appConfig.company.theme}>
        <Navbar
          companyConfig={appConfig.company!}
          navbarConfig={appConfig.navbarLanding!}
        />
        {user ? <Dashboard /> : <Landing />}
        <Footer
          companyConfig={appConfig.company!}
          footerConfig={appConfig.footerLanding!}
        />
      </div>
    </>
  );
}
