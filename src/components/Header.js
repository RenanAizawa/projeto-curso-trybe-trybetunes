import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <header data-testid="header-component">
        <div>
          <Link to="/profile" data-testid="header-user-name">{user}</Link>
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = { user: PropTypes.string }.isRequired;

export default Header;
