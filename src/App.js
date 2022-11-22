import './App.css';
import {
    Router,
    HashRouter,
    Routes,
    Route
} from "react-router-dom";
import Jobs from "./pages/Jobs";
import JobsDetail from "./pages/JobsDetail";
import Login from "./pages/Login";

export default function App() {
  return (
      <HashRouter  history={Router.browserHistory}>
          <div>
              <div className={"header-color padding-10px-50px"}>
                  <h2 className={"text-white text-bold"}>GitHub <span className={"text-thin"}>Jobs</span></h2>
              </div>
              <Routes>
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobsDetail />} />
                <Route path="/" element={<Login />} />
              </Routes>
        </div>
      </HashRouter>
  );
}
