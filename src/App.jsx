import {useEffect, useState} from 'react';
import {Routes, Route, Link} from 'react-router';
import Detail from './components/detail';
import './App.css';

export default function App() {
    const [AllAgents, setAllAgents] = useState([]);
    const [SearchText, setSearchText] = useState("");

    useEffect(() => {
        fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
            .then(Answer => Answer.json())
            .then(data => setAllAgents(data.data));
    }, []);
    const FilteredAgents = AllAgents.filter(agent => {
        const NameOfAgent = agent.displayName.toLowerCase();
        const SearchTerm = SearchText.toLowerCase();
        return NameOfAgent.includes(SearchTerm);
    });

    return (
        <Routes>
            <Route path="/" element={
                <main>
                    <h1 className="title">Valorant Agents</h1>
                    <div className="search-box">
                        <input
                            className="search-input"
                            placeholder="Zoek een agent"
                            value={SearchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                    </div>
                    <div className="agent-grid">
                        {FilteredAgents.map(agent => (
                            <div key={agent.uuid} className="agent-card">
                                <img src={agent.displayIcon} alt={agent.displayName}/>
                                <h3>{agent.displayName}</h3>
                                <Link to={`/detail/${agent.uuid}`}>Bekijk Info</Link>
                            </div>
                        ))}
                    </div>
                </main>
            }/>

            <Route path="/detail/:id" element={<Detail/>}/>
        </Routes>
    );
}