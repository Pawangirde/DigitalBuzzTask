import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import DateTimeWidget from "./pages/DateTimeWidget.jsx";
import ChartWidget from "./pages/ChartWidget.jsx";
import DropdownWidget from "./pages/DropdownWidget.jsx";
import MultiDocumentUpload from "./pages/MultiUploadPage.jsx";
import NotificationDemo from "./pages/NotificationDemo.jsx";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DateTimeWidget />} />
          <Route path="/chart" element={<ChartWidget />} />
          <Route path="/dropdown" element={<DropdownWidget />} />
          <Route path="/upload" element={<MultiDocumentUpload />} />
          <Route path="/notifications" element={<NotificationDemo />} />
        </Routes>
      </Layout>
    </Router>
  );
}
