import React from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import InboxPage from './pages/InboxPage/InboxPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SessionsPage from './pages/SessionsPage/SessionsPage';
import SessionPage from './pages/SessionPage/SessionPage';
import PaymentsPage from './pages/PaymentsPage/PaymentsPage';
import DiscoveryPage from './pages/DiscoveryPage/DiscoveryPage';
import DocumentsPage from './pages/DocumentsPage/DocumentsPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/inbox'>
          <InboxPage/>
        </Route>
        <Route path='/profile'>
          <ProfilePage/>
        </Route>
        <Route path='/sessions'>
          <SessionsPage/>
        </Route>
        <Route path='/session'>
          <SessionPage/>
        </Route>
        <Route path='/payments'>
          <PaymentsPage/>
        </Route>
        <Route path='/discovery'>
          <DiscoveryPage/>
        </Route>
        <Route path='/documents'>
          <DocumentsPage/>
        </Route>
        <Route path='/settings'>
          <SettingsPage/>
        </Route>
        <Route path='/'>
          <HomePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
