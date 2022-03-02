// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import CalendarR from "./Routes/CalendarR";
import Calendar from "./Components/Calendar/Calendar";
import Home from "./Routes/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar/>} />
        <Route path="users/*" element={<CalendarR />} />
      </Routes>
    </BrowserRouter>
  );
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
          <Route path="Calendar" element={<CalendarR />} />
      </Routes>
    </div>
  );
}