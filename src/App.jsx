import {useEffect, useState} from 'react';
import {Routes, Route, Link} from 'react-router';
import {FaStar, FaRegStar} from "react-icons/fa";
import {TbBrandValorant} from "react-icons/tb";
import RoleChart from './components/RoleChart';
import Detail from './components/detail';
import './App.css';

// andere bestanden mogen dit gebruiken
export default function App() {

// Dit is waar alle agents inzitten
    const [allAgents, setAllAgents] = useState([]);

// voor wat de gebruiker typt in de zoekbalk
    const [searchText, setSearchText] = useState("");

// Dit is waar alle favorieten inzitten
    const [favorites, setFavorites] = useState([]);


// Haal agents op van de API
    function refreshAgents() {
        fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
            .then(response => response.json())
            .then(list => setAllAgents(list.data));
    }

// Roep refreshAgents aan zodra de pagina opent
    useEffect(() => {
        refreshAgents();
    }, []);

    function toggleFavorite(agentId) {

        // Als de ID in de lijst ziet
        if (favorites.includes(agentId)) {

            //Maak een nieuwe lijst
            const newList = [];

            //Ga alle favoriete in de lijst langs
            for (let i = 0; i < favorites.length; i++) {

                // Als ID niet gelijk is verwijder
                if (favorites[i] != agentId) {
                    newList.push(favorites[i]);
                }
            }

            // Sla de nieuwe lijst op
            setFavorites(newList);

            //Voeg toe als ID er nog niet inzat
        } else {
            const newList = favorites.concat(agentId);
            setFavorites(newList);
        }
    }

    // Maak een lege lijst
    const filteredAgents = [];

    // Stopt als hij door alle agents heen is
    for (let i = 0; i < allAgents.length; i++) {

        // Leest de agents uit
        const agent = allAgents[i];

        // Als zoekterm in agents zit (zet om naar lowercase)
        if (agent.displayName.toLowerCase().includes(searchText.toLowerCase())) {
            filteredAgents.push(agent);
        }
    }

    return (
        <Routes>

            {/*wat er op het scherm komt*/}
            <Route path="/" element={
                <main>

                    {/*Refresh de pagina met nieuwe data*/}
                    <button className="refresh-button" onClick={refreshAgents}>
                        <TbBrandValorant/>
                    </button>

                    {/*Titel*/}
                    <h1 className="title">Valorant Agents</h1>

                    {/*Toont iconen van de favorite agents*/}
                    <div className="favorites-bar">
                        {allAgents.map(agent => {

                            // Als de agents erin zit, geef het plaatje terug
                            if (favorites.includes(agent.uuid)) {
                                return <img key={agent.uuid} src={agent.displayIcon} alt={agent.displayName}
                                            className="favorites-icon" title={agent.displayName}/>
                            }
                        })}
                    </div>

                    <div className="search-box">
                        <input
                            className="search-input"
                            placeholder="Zoek een agent"
                            value={searchText}

                            // Als er iets verandert in het tekstvakje, stop de nieuwe tekst in het searchText bakje
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                    </div>

                    {/* Als de zoekbalk leeg is, laat de chart zien */}
                    {searchText == "" && <RoleChart agents={allAgents}/>}

                    <div className="agent-grid">
                        {filteredAgents.map(agent => (

                            // Kaartje per agent
                            <div key={agent.uuid} className="agent-card">
                                <img src={agent.displayIcon} alt={agent.displayName}/>
                                <h3>{agent.displayName}</h3>

                                {/* Favoriet knop, voegt toe of verwijdert */}
                                <button className="favorite-button" onClick={() => toggleFavorite(agent.uuid)}>
                                    {favorites.includes(agent.uuid) ? <FaStar/> : <FaRegStar/>} Favoriet
                                </button>

                                {/* Link naar de detailpagina van deze agent */}
                                <Link to={`/detail/${agent.uuid}`}>Bekijk Info</Link>
                            </div>
                        ))}
                    </div>
                </main>
            }/>

            {/*Ga naar de detail pagina*/}
            <Route path="/detail/:id" element={<Detail/>}/>
        </Routes>
    );
}