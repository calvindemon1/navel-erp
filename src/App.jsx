import { Router, Route } from "@solidjs/router";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import OrdersList from "./pages/OrdersList";
import OrderForm from "./pages/OrderForm";
import CustomerList from "./pages/CustomersList";
import CustomerForm from "./pages/CustomerForm";
import UserList from "./pages/UsersList";
import UsersList from "./pages/UsersList";
import UserForm from "./pages/UserForm";
import TransactionsList from "./pages/TransactionsList";
import TransactionForm from "./pages/TransactionForm";
import SuppliersList from "./pages/SuppliersList";
import SuppliersListForm from "./pages/SuppliersListForm";
import ColorsList from "./pages/ColorsList";
import ColorForm from "./pages/ColorForm";
import FabricsList from "./pages/FabricsList";
import FabricForm from "./pages/FabricForm";
import SOTypesList from "./pages/SOTypesList";
import SOTypeForm from "./pages/SOTypeForm";

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

      <Route path="/customer-type" component={FabricsList} />
      <Route path="/customer-type/form" component={FabricForm} />
    </Router>
  );
}

export default App;
