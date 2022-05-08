import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { getUser } from '../services/userAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      load: false,
      load2: true,
      musicasRecuperadas: [],
      idFavoritas: [],
    };
  }

  componentDidMount() {
    this.carregandoUsuario();
    this.recuperandoMusicasFavoritas();
  }

  carregandoUsuario = async () => {
    this.setState({ load: true });
    const user = await getUser();
    this.setState({
      load: false,
      userName: user.name,
    });
  }

  recuperandoMusicasFavoritas = async () => {
    const MusicasRecuperadasdoLS = await getFavoriteSongs();
    this.setState({
      musicasRecuperadas: MusicasRecuperadasdoLS,
    }, () => {
      const { musicasRecuperadas } = this.state;
      const ids = [];
      musicasRecuperadas
        .map((track) => (
          ids.push(track.trackId)
        ));
      this.setState({
        load2: false,
        idFavoritas: ids,
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
          idFavoritas: [...prevState.musicasFavoritadas, music.trackId],
        }));
      });
    } else {
      this.setState({
        load2: true,
      }, async () => {
        await removeSong(music);
        const novasMusicas = await getFavoriteSongs();
        const { idFavoritas } = this.state;
        const novasIdFavoritas = idFavoritas.filter((id) => id !== music.trackId);
        this.setState({
          load2: false,
          idFavoritas: [...novasIdFavoritas],
          musicasRecuperadas: novasMusicas,
        });
      });
    }
  }

  render() {
    const { load, load2, userName, musicasRecuperadas, idFavoritas } = this.state;
    return (
      <div data-testid="page-favorites">
        {
          load
            ? <Carregando />
            : <Header user={ userName } />
        }
        <div>
          {
            load2
              ? <Carregando />
              : (
                musicasRecuperadas.map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    track={ track }
                    addFavMusic={ (e) => this.handleFavMusic(e, track) }
                    checked={ idFavoritas.some((id) => id === track.trackId) }
                  />
                ))
              )
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
