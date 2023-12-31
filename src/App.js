import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AlbumId from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div className="main-box">
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login { ...props } />) }
          />
          <Route exact path="/search" render={ () => <Search /> } />
          <Route exact path="/album/:id" render={ (props) => <AlbumId { ...props } /> } />
          <Route exact path="/favorites" render={ () => <Favorites /> } />
          <Route exact path="/profile" render={ () => <Profile /> } />
          <Route
            exact
            path="/profile/edit"
            render={
              (props) => <ProfileEdit { ...props } />
            }
          />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
