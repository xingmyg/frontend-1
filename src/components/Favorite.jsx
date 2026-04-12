import './Comp.css';

function FavoritesBar({allAgents, favorites}) {
    return (
        <div className="favorites-bar">
            {allAgents.map(agent => {

                // Als de agent favoriet is, laat een icoontje zien
                if (favorites.includes(agent.uuid)) {
                    return <img key={agent.uuid} src={agent.displayIcon} alt={agent.displayName}
                                className="favorites-icon" title={agent.displayName}/>
                }
            })}
        </div>
    );
}

export default FavoritesBar;