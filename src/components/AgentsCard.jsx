import {Link} from 'react-router';
import {FaStar, FaRegStar} from "react-icons/fa";
import './Comp.css';

// Kleur per rol
const roleColors = {
    "Duelist": "#bd3944",
    "Initiator": "#ff8c00",
    "Controller": "#00c8ff",
    "Sentinel": "#7E24D6"
};

function AgentCard({agent, favorites, toggleFavorite}) {

    // Pak de kleur van de rol, of grijs als geen rol
    const roleColor = agent.role ? roleColors[agent.role.displayName] : "#888";

    return (
        <div className="agent-card">
            <img src={agent.displayIcon} alt={agent.displayName}/>
            <h3>{agent.displayName}</h3>

            {/* Rol tag met kleur */}
            {agent.role && (
                <span className="role-tag" style={{backgroundColor: roleColor}}>
                    {agent.role.displayName}
                </span>
            )}

            {/* Favoriet knop */}
            <button className="favorite-button" onClick={() => toggleFavorite(agent.uuid)}>
                {favorites.includes(agent.uuid) ? <FaStar/> : <FaRegStar/>} Favoriet
            </button>

            {/* Link naar detailpagina */}
            <Link to={`/detail/${agent.uuid}`}>Bekijk Info</Link>
        </div>
    );
}

export default AgentCard;