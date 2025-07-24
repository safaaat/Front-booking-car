import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Car, Booking, Riwayat } from "./pages/Index";
import PrivateRouter from "./router/PrivateRouter";
import { useAppSelector } from "./app/hooks";

function App() {
  const { dataAdmin } = useAppSelector((state) => state.admin);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Admin */}
          <Route path="/admin/car" element={<PrivateRouter isAdmin={dataAdmin}><Car /></PrivateRouter>} />
          <Route path="/admin/booking" element={<PrivateRouter isAdmin={dataAdmin}><Booking /></PrivateRouter>} />
          <Route path="/admin/riwayat" element={<PrivateRouter isAdmin={dataAdmin}>< Riwayat /></PrivateRouter>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App