import { FC, ReactNode } from "react";
import { toolConfig } from "./toolConfig";
import { createClient } from "@/lib/utils/supabase/server";
import PaymentModal from "@/components/paywall/Payment";
import { redirect } from "next/navigation";
import SidebarWrapper from "@/components/chat/ChatSideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
    return null;
  }

  if (toolConfig.paywall) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const { credits } = profile;

    if (credits < toolConfig.credits) {
      return <PaymentModal />;
    }
  }

  return (
    <div
      className="flex bg-white min-h-screen h-screen"
      data-theme={toolConfig.company.theme}
    >
      <SidebarWrapper user={user} />
      <main className="mt-10 flex-1 flex flex-col p-2 md:p-8 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
