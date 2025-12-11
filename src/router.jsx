import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Caseload from "./pages/Caseload.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

//Auth and Protected Routes
import PrivateRoute from "./pages/PrivateRoute.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signIn", element: <SignIn /> },
  { path: "/signUp", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/caseload",
    element: (
      <PrivateRoute>
        <Caseload />
      </PrivateRoute>
    ),
  },
  { path: "*", element: <NotFoundPage /> },
  {
    path: "/caseload/:id",
    element: (
      <PrivateRoute>
        <StudentDetails />
      </PrivateRoute>
    ),
  },
]);
