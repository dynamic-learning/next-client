import Simulations from "../src/components/sim-repo";
import * as mutations from '../src/api/mutations'

const SimulationsPage = () => {
    return (<Simulations 
        addSim= {mutations.addSim} 
        editSim= {mutations.editSim}
        deleteSim= {mutations.deleteSim} 
    />
)};

export default SimulationsPage;
