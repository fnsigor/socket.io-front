import CreateOrderButton from "./components/CreateOrderButton";
import OrderTable from "./components/OrderTable";
import ModalCreateOrder from "./components/ModalCreateOrder";
import { AllOrdersContext } from "./context";

export default function Home() {
    return (
        <main>
            <AllOrdersContext>
                <OrderTable />
                <CreateOrderButton />
                <ModalCreateOrder />
            </AllOrdersContext>
        </main>
    );
}
