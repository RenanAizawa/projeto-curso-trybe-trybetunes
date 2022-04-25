import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
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
      <div data-testid="page-search">
        {
          load
            ? <Carregando />
            : <Header user={ userName } />
        }
        <div>
          <h1>oi sou child search</h1>
          <form>
            <input type="text" />
            <button type="button">Pesquisar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
