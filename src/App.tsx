import { BrowserRouter, Route, Routes } from "react-router";
import PageComponents from "./pages/page-components";
import { LayoutMain } from "./pages/layout-main";
import PageHome from "./pages/page-home";
import PageNewRefund from "./pages/page-new-refund";
import PageConfirmation from "./pages/page-confirmation";
import PageRefundDetails from "./pages/page-refund-details";

export default function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/components" element={<PageComponents />} />

        <Route element={<LayoutMain />}>
          <Route index element={<PageHome />} />
          <Route path="/new-refund" element={<PageNewRefund />} />
          <Route path="/confirmation" element={<PageConfirmation />} />
          <Route path="/refunds/:id" element={<PageRefundDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}