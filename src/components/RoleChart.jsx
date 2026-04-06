import {PieChart, Pie, Cell, Legend} from 'recharts';
import './Comp.css';

// Kleuren per stuk van de chart
const COLORS = ['#bd3944', '#ff8c00', '#00c8ff', '#7E24D6' +
''];

function RoleChart({agents}) {

    // Elke rol begint op 0
    const duelist = {name: "Duelist", value: 0};
    const initiator = {name: "Initiator", value: 0};
    const controller = {name: "Controller", value: 0};
    const sentinel = {name: "Sentinel", value: 0};

    // Ga elke agent een voor een langs
    for (let i = 0; i < agents.length; i++) {

        // Pak de agent op positie i
        const agent = agents[i];

        // Heeft deze agent geen rol, sla hem over en ga naar de volgende
        if (agent.role == null) continue;

        // Kijk welke rol de agent heeft en tel 1 erbij op
        if (agent.role.displayName == "Duelist") duelist.value = duelist.value + 1;
        if (agent.role.displayName == "Initiator") initiator.value = initiator.value + 1;
        if (agent.role.displayName == "Controller") controller.value = controller.value + 1;
        if (agent.role.displayName == "Sentinel") sentinel.value = sentinel.value + 1;
    }

    // Zet alles in een lijst voor de chart
    const data = [duelist, initiator, controller, sentinel];

    return (
        <div className="chart-wrapper">
            <h2 className="chart-title">Agents per role</h2>

            {/* Cirkeldiagram */}
            <PieChart width={300} height={300}>

                {/* Diagram gedeelte */}
                <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>

                    {/* Geef elk stuk een eigen kleur */}
                    {data.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index]}/>
                    ))}

                </Pie>

                {/* Legenda onderaan */}
                <Legend/>

            </PieChart>
        </div>
    );
}

export default RoleChart;