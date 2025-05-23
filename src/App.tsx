
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuestionUpload from "./pages/QuestionUpload";
import NotFound from "./pages/NotFound";



const App = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/upload" element={<QuestionUpload />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>

);

export default App;


