import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getUserInfo, updateUserId } from './features/user/userSlice'
import style from './App.module.scss';
import {BrowserRouter, Switch, Route, Link, Routes} from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
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
import BookSession from './pages/BookSession/BookSession';
import SessionConfirmation from './pages/SessionConfirmation/SessionConfirmation';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth/RequireAuth';

Amplify.configure(awsExports);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();


  return (
    <Authenticator.Provider>
        <main className={style.mainView}>
          {
            <div className={style.content}>
              <Routes>
                <Route path='/' element={<Layout/>}>
                  <Route index element={<HomePage />} />
                  <Route
                    path='/login'
                    element={<Login />}
                  />
                  <Route
                    path='/inbox'
                    element={
                      <RequireAuth>
                        <InboxPage/>
                      </RequireAuth>
                    }
                  />

                  <Route
                    path='/profile/:id'
                    element={
                      <RequireAuth>
                        <ProfilePage/>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path='/sessions'
                    element={
                      <RequireAuth>
                        <SessionsPage/>
                      </RequireAuth>
                    }
                  />

                  <Route
                    path='/session/:id'
                    element={
                      <RequireAuth>
                        <SessionPage/>
                      </RequireAuth>
                      }
                  />

                  <Route
                    path='/book/session'
                    element={
                      <RequireAuth>
                        <BookSession />
                      </RequireAuth>
                      }
                  />
                  <Route
                    path='/sessionConfirmation'
                    element={
                      <RequireAuth>
                        <SessionConfirmation/>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path='/payments'
                    element={
                      <RequireAuth>
                        <PaymentsPage/>
                      </RequireAuth>
                    }
                  />
                  <Route
                    path='/discover'
                    element={
                      <RequireAuth>
                        <DiscoveryPage/>
                      </RequireAuth>
                      }
                  />
                  <Route
                    path='/documents'
                    element={
                      <RequireAuth>
                        <DocumentsPage/>
                      </RequireAuth>
                      }
                  />
                  <Route
                    path='/settings'
                    element={
                      <RequireAuth>
                        <SettingsPage/>
                      </RequireAuth>
                      }
                  />
                  </Route>
                </Routes>
            </div>
          }

        </main>

    </Authenticator.Provider>
  );
}

export default App;
