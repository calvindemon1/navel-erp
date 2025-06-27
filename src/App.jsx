import { Router, Route } from "@solidjs/router";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import OrdersList from "./pages/OrdersList";
import OrderForm from "./pages/OrderForm";
import UsersList from "./pages/UsersList";
import UserForm from "./pages/UserForm";
import TransactionsList from "./pages/TransactionsList";
import TransactionForm from "./pages/TransactionForm";
// MASTER DATA
import CustomerList from "./pages/master_data/CustomersList";
import CustomerForm from "./pages/master_data/CustomerForm";
import SuppliersList from "./pages/master_data/SuppliersList";
import SuppliersListForm from "./pages/master_data/SuppliersListForm";
import ColorsList from "./pages/master_data/ColorsList";
import ColorForm from "./pages/master_data/ColorForm";
import FabricsList from "./pages/master_data/FabricsList";
import FabricForm from "./pages/master_data/FabricForm";
import SOTypesList from "./pages/master_data/SOTypesList";
import SOTypeForm from "./pages/master_data/SOTypeForm";
import CustomerTypesList from "./pages/master_data/CustomerTypesList";
import CustomerTypeForm from "./pages/master_data/CustomerTypeForm";
import CurrenciesList from "./pages/master_data/CurrenciesList";
import CurrencyForm from "./pages/master_data/CurrencyForm";

function App() {
  return (
    <Router>
      <Route path="/" component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/orders" component={OrdersList} />
      <Route path="/orders/form" component={OrderForm} />

      <Route path="/transactions" component={TransactionsList} />
      <Route path="/transactions/form" component={TransactionForm} />

      <Route path="/users" component={UsersList} />
      <Route path="/users/form" component={UserForm} />

      <Route path="/suppliers" component={SuppliersList} />
      <Route path="/suppliers/form" component={SuppliersListForm} />

      <Route path="/customers" component={CustomerList} />
      <Route path="/customers/form" component={CustomerForm} />

      <Route path="/colors" component={ColorsList} />
      <Route path="/colors/form" component={ColorForm} />

      <Route path="/fabrics" component={FabricsList} />
      <Route path="/fabrics/form" component={FabricForm} />

      <Route path="/so-type" component={SOTypesList} />
      <Route path="/so-type/form" component={SOTypeForm} />

      <Route path="/customer-type" component={CustomerTypesList} />
      <Route path="/customer-type/form" component={CustomerTypeForm} />

      <Route path="/currencies" component={CurrenciesList} />
      <Route path="/currencies/form" component={CurrencyForm} />
    </Router>
  );
}

export default App;
