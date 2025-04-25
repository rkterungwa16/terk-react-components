import { Component, Suspense, lazy } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ClientRoutes } from "./routes";

const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));
const HomePage = lazy(() => import("./pages/home"));

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path={ClientRoutes.REGISTER}
            element={
              <Suspense fallback={<>...</>}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path={ClientRoutes.LOGIN}
            element={
              <Suspense fallback={<>...</>}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path={ClientRoutes.HOME}
            element={
              // <PrivateRoute>
              //   <Suspense fallback={<>...</>}>
              //     <DashboardPage />
              //   </Suspense>
              // </PrivateRoute>
              <Suspense fallback={<>...</>}>
                <HomePage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
