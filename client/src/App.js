import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail';
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path= '/' element={<LandingPage/>} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/create' element={<RecipeCreate/>} />
        <Route exact path="/recipes/:id" element={<Detail/>} />
        <Route exact path="/notFound" element={<NotFound/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
