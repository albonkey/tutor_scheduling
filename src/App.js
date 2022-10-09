import React from 'react';
import style from './App.module.scss';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import TopMenu from './components/TopMenu/TopMenu';
import SideMenu from './components/SideMenu/SideMenu';

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
      <TopMenu />
      <main className={style.mainView}>
        <SideMenu />
        <div className={style.content}>
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
            <Route path='/discover'>
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
        </div>
      </main>

    </BrowserRouter>
  );
}

export default App;
