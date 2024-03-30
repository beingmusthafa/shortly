import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import CheckAuth from "./components/CheckAuth";
const GetStarted = lazy(() => import("./pages/GetStarted"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={null}>
              <GetStarted />
            </Suspense>
          }
        />
        <Route element={<CheckAuth />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={null}>
                <Dashboard />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
