import React, { useMemo } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import { Container, createMuiTheme, CssBaseline, 
  ThemeProvider, useMediaQuery } from '@material-ui/core';
import CreateCollection from "./collections/CreateCollection";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ResetPasswordForm from "./auth/ResetPasswordForm";
import RequestResetForm from "./auth/RequestResetForm";
import axios from "axios";
import ProvideAuth from "./auth/ProvideAuth";
import PrivateRoute from "./auth/PrivateRoute";
import CollectionDetailPage from "./pages/CollectionDetailPage";
import EditContent from "./pages/EditContent";
import LandingPage from "./pages/LandingPage";
import NavigationBar from "./layout/NavigationBar";
import Footer from "./layout/Footer";
import PublicCollectionList from "./collections/PublicCollectionList";

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
      () => createMuiTheme({
          palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          },
      }), 
      [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar/>
      <Container maxWidth="lg" id="parent-container">
        <CssBaseline />
        <ProvideAuth>
          <div>
            <LandingPage />
            <Switch>
              <Route exact path="/login/" component={SignIn} />
              <Route exact path="/register/" component={SignUp} />
              <Route exact path="/request-reset/" component={RequestResetForm} />
              <Route exact path="/reset-password" component={ResetPasswordForm} />
              <PrivateRoute exact path="/collections/" >
                <Home />
              </PrivateRoute>
              <PrivateRoute exact path="/collections/new/" >
                <CreateCollection />
              </PrivateRoute>
              <PrivateRoute exact path="/collections/:collectionId/" >
                <CollectionDetailPage />
              </PrivateRoute>
              <PrivateRoute exact path="/collections/:collectionId/:contentId/" >
                <EditContent />
              </PrivateRoute>
              <Route exact path="/:username/" component={UserProfile} />
              <Route exact path="/:username/:collectionId/" >
                <PublicCollectionList />
              </Route>
            </Switch>
          </div>
        </ProvideAuth>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}

//axios.defaults.baseURL = 'http://techshare.club/'; // prod
axios.defaults.baseURL = 'http://127.0.0.1:8000/'; // dev