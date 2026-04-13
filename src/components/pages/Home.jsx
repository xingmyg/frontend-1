import {useEffect, useState} from 'react';
import {TbBrandValorant} from "react-icons/tb";
import RoleChart from '../RoleChart.jsx';
import SearchBar from '../SearchAgent.jsx';
import FavoritesBar from '../Favorite.jsx';
import AgentCard from '../AgentsCard.jsx';
import '../Comp.css';

function Home() {

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

    // Voeg agent toe aan favorieten of verwijder hem
    function toggleFavorite(agentId) {

        // Als de ID in de lijst zit
        if (favorites.includes(agentId)) {

            // Maak een nieuwe lijst
            const newList = [];

            // Ga alle favorieten in de lijst langs
            for (let i = 0; i < favorites.length; i++) {

                // Als ID niet gelijk is, voeg toe
                if (favorites[i] != agentId) {
                    newList.push(favorites[i]);
                }
            }

            // Sla de nieuwe lijst op
            setFavorites(newList);

            // Voeg toe als ID er nog niet inzat
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
        <main>
            {/* Refresh knop rechtsboven */}
            <button className="refresh-button" onClick={refreshAgents}>
                <TbBrandValorant/>
            </button>

            {/* Titel */}
            <h1 className="title">Valorant Agents</h1>

            {/* Icoontjes van favoriete agents */}
            <FavoritesBar allAgents={allAgents} favorites={favorites}/>

            {/* Zoekbalk */}
            <SearchBar searchText={searchText} setSearchText={setSearchText}/>

            {/* Als de zoekbalk leeg is, laat de chart zien */}
            {searchText == "" && <RoleChart agents={allAgents}/>}

            {/* Alle agent kaartjes */}
            <div className="agent-grid">
                {filteredAgents.map(agent => (
                    <AgentCard key={agent.uuid} agent={agent} favorites={favorites} toggleFavorite={toggleFavorite}/>
                ))}
            </div>
        </main>
    );
}

export default Home;