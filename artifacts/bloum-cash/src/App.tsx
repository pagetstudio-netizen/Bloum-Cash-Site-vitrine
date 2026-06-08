import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const queryClient = new QueryClient();

function Router() {
  return (
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
      <Route path="/confidentialite" component={Confidentialite} />
      <Route path="/mentions-legales" component={MentionsLegales} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
