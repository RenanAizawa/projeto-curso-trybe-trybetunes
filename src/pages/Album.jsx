import PropTypes from 'prop-types';
import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import { getUser } from '../services/userAPI';

class AlbumId extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      load: false,
      load2: true,
      infoAlbum: [],
      musicasDoAlbum: [],
      musicasFavoritadas: [],
      musicasRecuperadas: [],
    };
  }

  componentDidMount() {
    this.carregandoUsuario();
    this.albumRecuperado();
    // this.setState({ load2: true });
    this.recuperaFav();
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
      .filter((obj, index) => (index !== 0));
    this.setState({
      infoAlbum: albumPesquisado[0],
      load2: false,
      musicasDoAlbum,
    });
  }

  recuperaFav = async () => {
    const respostaApi = await getFavoriteSongs();
    this.setState({
      musicasRecuperadas: [...respostaApi],
      load2: false,
    }, () => {
      const { musicasRecuperadas } = this.state;
      const ids = [];
      musicasRecuperadas
        .map((track) => (
          ids.push(track.trackId)
        ));
      this.setState({
        musicasFavoritadas: [...ids],
      });
    });
  }

  handleFavMusic = (e, music) => {
    const { checked } = e.target;
    if (checked) {
      this.setState({ load2: true }, async () => {
        await addSong(music);
        this.setState((prevState) => ({
          load2: false,
          musicasFavoritadas: [...prevState.musicasFavoritadas, music.trackId],
        }));
      });
    } else {
      this.setState({
        load2: true,
      }, async () => {
        await removeSong(music);
        const { musicasFavoritadas } = this.state;
        const novasFavoritas = musicasFavoritadas.filter((id) => id !== music.trackId);
        this.setState({
          load2: false,
          musicasFavoritadas: [...novasFavoritas],
        });
      });
    }
  }

  render() {
    const {
      load,
      userName,
      load2,
      infoAlbum,
      musicasDoAlbum,
      musicasFavoritadas,
    } = this.state;
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
                      <MusicCard
                        track={ track }
                        addFavMusic={ (e) => this.handleFavMusic(e, track) }
                        checked={ musicasFavoritadas
                          .some((id) => (track.trackId === id)) }
                      />
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
