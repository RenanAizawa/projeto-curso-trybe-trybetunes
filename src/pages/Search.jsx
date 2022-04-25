import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      pesquisa: '',
      artistaPesquisado: '',
      albunsEncontrados: [],
      load: false,
      load2: false,
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

  pesquisaApi = async () => {
    const { pesquisa } = this.state;
    this.setState({ load2: true, artistaPesquisado: pesquisa });
    const search = await searchAlbumsAPI(pesquisa);
    this.setState({
      pesquisa: '',
      load2: false,
      albunsEncontrados: [...search],
    });
  }

  render() {
    const {
      load,
      userName,
      isBtnDisebled,
      load2,
      albunsEncontrados,
      artistaPesquisado,
    } = this.state;
    return (
      <div data-testid="page-search">
        {
          load
            ? <Carregando />
            : <Header user={ userName } />
        }
        {' '}
        {
          load2
            ? <Carregando />
            : (
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
                    onClick={ () => this.pesquisaApi() }
                  >
                    Pesquisar
                  </button>
                </form>
              </div>
            )
        }
        <div>
          {
            albunsEncontrados.length === 0
              ? <h2>Nenhum álbum foi encontrado</h2>
              : (
                <div>
                  <p>
                    Resultado de álbuns de:
                    {' '}
                    {artistaPesquisado}
                  </p>
                  {albunsEncontrados.map((album) => (
                    <div key={ album.collectionId }>
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <p>{album.collectionName}</p>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        Mais detalhes
                      </Link>
                    </div>
                  ))}
                </div>

              )
          }
        </div>
      </div>
    );
  }
}

export default Search;
