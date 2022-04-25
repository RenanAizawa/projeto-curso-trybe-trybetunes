import React from 'react';
import Album from '../components/Album';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class AlbumId extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      load: false,
    };
  }

  async componentDidMount() {
    await this.carregandoUsuario();
  }

  carregandoUsuario = async () => {
    this.setState({ load: true });
    const user = await getUser();
    this.setState({
      load: false,
      userName: user.name,
    });
  }

  render() {
    const { load, userName } = this.state;
    return (
      <div data-testid="page-album">
        {
          load
            ? <Carregando />
            : <Header user={ userName } />
        }
        <div>
          <Album />
        </div>
      </div>
    );
  }
}

export default AlbumId;
