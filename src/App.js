import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Error404 from "./pages/error404";
import MenuTop from "./components/MenuTop";

function App() {
  const { Header, Content } = Layout;
  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: 1 }}>
          <MenuTop></MenuTop>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home></Home>
            </Route>
            <Route path="/contact" exact={true}>
              <Contact></Contact>
            </Route>
            <Route path="/*">
              <Error404></Error404>
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
