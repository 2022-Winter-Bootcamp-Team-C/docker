import { useState,useEffect} from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Dashboard from "./scences/dashboard";
import Income from "./scences/income";
import Spending from "./scences/spending"
import Bar from "./scences/bar";
import Line from "./scences/line";
import Pie from "./scences/pie";
import Challenge from "./scences/challenge"
import Index from './scences/intro'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/income" element={<Income />} />
              <Route path="/spending" element={<Spending/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/challenge" element={<Challenge />} />
            </Routes>
          </main>
          
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}

export default App;
