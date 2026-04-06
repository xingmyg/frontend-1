import {useParams, Link} from 'react-router';
import {useEffect, useState} from 'react';
import {FaArrowAltCircleLeft} from "react-icons/fa";
import './Comp.css';

function Detail() {

    // Pak het ID uit de URL
    const {id} = useParams();
    const [chosenAgent, setChosenAgent] = useState(null);

    // Haal de agent op zodra de pagina opent
    useEffect(() => {
        fetch(`https://valorant-api.com/v1/agents/${id}`)
            .then(response => response.json())
            .then(data => setChosenAgent(data.data));
    }, [id]);

    // Aan het laden, laat dit zien
    if (chosenAgent == null) {
        return <h2 className="center">Bezig met zoeken</h2>;
    }

    // Geen rol, dan "No role"
    let roleName = "No role";
    if (chosenAgent.role != null) {
        roleName = chosenAgent.role.displayName;
    }

    return (
        <div className="detail-box">

            {/* Terug knop */}
            <Link to="/" className="back-button"><FaArrowAltCircleLeft/> Terug naar overzicht</Link>
            <h1>{chosenAgent.displayName}</h1>
            <img src={chosenAgent.displayIcon} className="detail-image" alt="Agent image"/>
            <h3>Biografie</h3>
            <p>{chosenAgent.description}</p>
            <p><strong>Rol:</strong> {roleName}</p>
        </div>
    );
}

export default Detail;