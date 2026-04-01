import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';

function Detail() {
    const { id } = useParams();
    const [ChosenAgent, setChosenAgent] = useState(null);
    useEffect(() => {
        fetch(`https://valorant-api.com/v1/agents/${id}`)
            .then(Answer => Answer.json())
            .then(data => setChosenAgent(data.data));
    }, [id]);

    if (ChosenAgent == null) {
        return <h2 className="center">Bezig met zoeken</h2>;
    }
    return (
        <div className="detail-box">
            <Link to="/" className="back-button"><strong>Terug naar overzicht</strong></Link>
            <h1>{ChosenAgent.displayName}</h1>
            <img src={ChosenAgent.displayIcon} className="detail-image" alt="Agent image"/>
            <h3>Biografie</h3>
            <p>{ChosenAgent.description}</p>
            <p><strong>Rol:</strong> {ChosenAgent.role ? ChosenAgent.role.displayName : "No role"}</p>
        </div>
    );
}
export default Detail;