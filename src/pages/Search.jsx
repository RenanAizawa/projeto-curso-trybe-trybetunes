import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      pesquisa: '',
      load: false,
      isBtnDisebled: true,
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

  artistName = (e) => {
    const { value } = e.target;
    this.setState({ pesquisa: value }, () => {
      const { pesquisa } = this.state;
      const rule = 2;
      if (pesquisa.length >= rule) {
        this.setState({ isBtnDisebled: false });
      } else {
        this.setState({ isBtnDisebled: true });
      }
    });
  }

  render() {
    const { load, userName, isBtnDisebled } = this.state;
    return (
      <div data-testid="page-search">
        {
          load
            ? <Carregando />
            : <Header user={ userName } />
        }
        <div>
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ (e) => this.artistName(e) }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isBtnDisebled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
