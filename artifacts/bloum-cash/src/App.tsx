import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { SiteConfigProvider } from "@/contexts/SiteConfigContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Fonctionnalites from "@/pages/Fonctionnalites";
import Securite from "@/pages/Securite";
import APropos from "@/pages/APropos";
import Support from "@/pages/Support";
import Telecharger from "@/pages/Telecharger";
import Tarifs from "@/pages/Tarifs";
import Contact from "@/pages/Contact";
import Conditions from "@/pages/Conditions";
import Confidentialite from "@/pages/Confidentialite";
import MentionsLegales from "@/pages/MentionsLegales";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminTOTPSetup from "@/pages/admin/AdminTOTPSetup";
import AdminTOTPVerify from "@/pages/admin/AdminTOTPVerify";
import AdminDashboard from "@/pages/admin/AdminDashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/fonctionnalites" component={Fonctionnalites} />
        <Route path="/securite" component={Securite} />
        <Route path="/a-propos" component={APropos} />
        <Route path="/support" component={Support} />
        <Route path="/telecharger" component={Telecharger} />
        <Route path="/tarifs" component={Tarifs} />
        <Route path="/contact" component={Contact} />
        <Route path="/conditions" component={Conditions} />
        <Route path="/conditions-generales-dutilisation" component={Conditions} />
        <Route path="/confidentialite" component={Confidentialite} />
        <Route path="/politique-de-confidentialite" component={Confidentialite} />
        <Route path="/mentions-legales" component={MentionsLegales} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/totp-setup" component={AdminTOTPSetup} />
        <Route path="/admin/totp-verify" component={AdminTOTPVerify} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SiteConfigProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </SiteConfigProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
