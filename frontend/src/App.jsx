import './App.css';
import { Route , Switch } from "react-router-dom";

import Header from "./components/Header.jsx";
import LoadingBar from "./components/loadingBar.jsx";
import Logout from "./components/Logout.jsx";

import HomePage from "./pages/HomePage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProjectListPage from "./pages/admin/ProjectListPage.jsx";
import ProjectEditPage from "./pages/admin/ProjectEditPage.jsx";

import styled from 'styled-components'

const App = () => {
  return (
    <div className="App">
      <LoadingBar/> 
      <Container>
        <Header />
        <Switch >
              <Route path="/" exact component={HomePage}/>
              <Route path="/portfolio" exact component={PortfolioPage}/>
              <Route path="/contact" exact component={ContactPage}/>
              <Route path="/project/:id" exact component={ProjectPage}/>
              <Route path="/jm-login" exact component={LoginPage}/>
              <Route path="/jm-register" exact component={RegisterPage}/>
              <Route path="/admin/projects" exact component={ProjectListPage}/>
              <Route path="/admin/project/:id/edit" exact component={ProjectEditPage}/>
        </Switch>
        <Logout />
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px 25px;
  min-height:100vh;
  height:100%;
  @media (max-width: 768px) {
    padding: 0px 50px;
  }
  @media (max-width: 425px) {
    padding: 0px 25px;
  }
`

export default App;
