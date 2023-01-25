import { Routes, Route} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Income from "./pages/income";
import Spending from "./pages/spending"
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import Challenge from "./pages/challenge/challenge"
import Index from './pages/intro'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [theme, colorMode] = useMode();

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
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
