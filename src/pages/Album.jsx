import PropTypes from 'prop-types';
import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getUser } from '../services/userAPI';

class AlbumId extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      load: false,
      load2: false,
      infoAlbum: [],
      musicasDoAlbum: [],
    };
  }

  async componentDidMount() {
    await this.carregandoUsuario();
    await this.albumRecuperado();
  }

  carregandoUsuario = async () => {
    this.setState({ load: true });
    const user = await getUser();
    this.setState({
      load: false,
      userName: user.name,
    });
  }

  albumRecuperado = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ load2: true });
    const albumPesquisado = await getMusics(id);
    const musicasDoAlbum = albumPesquisado
      .filter((obj) => (obj.wrapperType !== 'collection'));
    this.setState({
      infoAlbum: albumPesquisado[0],
      load2: false,
      musicasDoAlbum,
    });
  }

  render() {
    const { load, userName, load2, infoAlbum, musicasDoAlbum } = this.state;
    console.log(musicasDoAlbum);
    return (
      <div data-testid="page-album">
        {
          load
            ? <Carregando />
            : <Header user={ userName } />
        }
        {
          load2
            ? <Carregando />
            : (
              <div>
                <div>
                  <img src={ infoAlbum.artworkUrl100 } alt={ infoAlbum.collectionId } />
                  <h3 data-testid="album-name">{ infoAlbum.collectionName }</h3>
                  <p data-testid="artist-name">
                    Artista:
                    {' '}
                    {infoAlbum.artistName}
                  </p>
                  <p>
                    Data de Lançamento:
                    {' '}
                    {infoAlbum.releaseDate}
                  </p>
                </div>
                {
                  musicasDoAlbum.map((track) => (
                    <div key={ track.trackId }>
                      <p>{track.trackName}</p>
                    </div>
                  ))
                }
              </div>
            )
        }
      </div>
    );
  }
}

AlbumId.propTypes = { match: PropTypes.object }.isRequired;

export default AlbumId;
