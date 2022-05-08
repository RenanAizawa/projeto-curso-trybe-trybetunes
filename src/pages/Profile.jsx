import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userMail: '',
      userDescription: '',
      userImage: '',
      load: false,
    };
  }

  componentDidMount() {
    this.carregandoUsuario();
  }

  carregandoUsuario = async () => {
    this.setState({ load: true });
    const user = await getUser();
    this.setState({
      load: false,
      userName: user.name,
      userMail: user.email,
      userDescription: user.description,
      userImage: user.image,
    });
  }

  render() {
    const { load, userName, userMail, userDescription, userImage } = this.state;
    return (
      <div data-testid="page-profile">
        {
          load
            ? <Carregando />
            : <Header user={ userName } />
        }
        <div>
          <img src={ userImage } alt={ userName } data-testid="profile-image" />
          <h1>{userName}</h1>
          <Link to="/profile/edit">Editar perfil</Link>
          <p>{userMail}</p>
          <p>{userDescription}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
