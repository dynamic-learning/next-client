import Simulations from "../src/components/sim-repo";
import * as mutations from "../src/api/mutations";
import * as queries from "../src/api/queries";

const SimulationsPage = () => {
  return (
    <Simulations
      addSim={mutations.addSim}
      editSim={mutations.editSim}
      deleteSim={mutations.deleteSim}
      getSims={queries.getSims}
    />
  );
};

export default SimulationsPage;
