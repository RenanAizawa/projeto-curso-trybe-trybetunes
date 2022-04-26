import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { track, addFavMusic, checked } = this.props;
    return (
      <div>
        <div>
          <p>{track.trackName}</p>
          <audio data-testid="audio-component" src={ track.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ track.trackId }>
            Favorita
            <input
              type="checkbox"
              id={ track.trackId }
              data-testid={ `checkbox-music-${track.trackId}` }
              onChange={ addFavMusic }
              checked={ checked }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
