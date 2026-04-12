import {Routes, Route} from 'react-router';
import Home from './components/Home';
import Detail from './components/Detail.jsx';
import './App.css';

// Andere bestanden mogen dit gebruiken
export default function App() {
    return (
        <Routes>
            {/* Hoofdpagina */}
            <Route path="/" element={<Home/>}/>

            {/* Detailpagina */}
            <Route path="/detail/:id" element={<Detail/>}/>
        </Routes>
    );
}