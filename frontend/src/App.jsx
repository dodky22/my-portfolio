import React from 'react';

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
import Page404 from "./pages/Page404.jsx";

import ProjectListPage from "./pages/admin/ProjectListPage.jsx";
import ProjectEditPage from "./pages/admin/ProjectEditPage.jsx";


import styled from 'styled-components'

const App = () => {
  return (
    <div className="App">
      <LoadingBar/> 
      <Header />
      <Container>
        <Switch >
              <Route path="/" exact component={HomePage}/>
              <Route path="/portfolio" exact component={PortfolioPage}/>
              <Route path="/contact" exact component={ContactPage}/>
              <Route path="/jm-login" exact component={LoginPage}/>
              <Route path="/jm-register" exact component={RegisterPage}/>
              <Route path="/admin/projects" exact component={ProjectListPage}/>
              <Route path="/project/:slug" exact component={ProjectPage}/>
              {/* <Route path="/project/:id" exact component={ProjectPage}/> */}             
              <Route path="/admin/project/:slug/:id/edit" exact component={ProjectEditPage}/>
              <Route component={Page404}/>
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
    padding: 0px 70px;
  }
  @media (max-width: 500px) {
    padding: 0px 30px;
  }
  @media (max-width: 400px) {
    padding: 0px 20px;
  }
  @media (max-width: 350px) {
    padding: 0px 15px;
  }
`

export default App;
