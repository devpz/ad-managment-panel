
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import AdList from "./pages/AdList";
import CreateAd from "./pages/CreateAd";
import EditAd from "./pages/EditAd";
import Error from "./pages/Error";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/error" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error" element={<Error />} />
        <Route
          path="/advertisements"
          element={
            <ProtectedRoute>
              <AdList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/advertisements/new"
          element={
            <ProtectedRoute>
              <CreateAd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/advertisements/edit/:id"
          element={
            <ProtectedRoute>
              <EditAd />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
