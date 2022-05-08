import PropTypes from 'prop-types';
import React from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      load: true,
      isDisebled: true,
      nome: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.recuperandoUsuario();
  }

  recuperandoUsuario = async () => {
    const user = await getUser();
    this.setState({
      nome: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      load: false,
    }, () => {
      this.handleBtnDisebled();
    });
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value }, () => {
      this.handleBtnDisebled();
    });
  }

  saveInfo = () => {
    const { nome, email, description, image } = this.state;
    const newUser = {
      name: nome,
      email,
      description,
      image,
    };
    this.setState({ load: true }, async () => {
      const { history } = this.props;
      await updateUser(newUser);
      history.push('/profile');
    });
  }

  handleBtnDisebled = () => {
    const { nome, email, description, image } = this.state;
    if (nome && email && description && image) {
      this.setState({ isDisebled: false });
    }
  }

  render() {
    const { load, isDisebled, nome, email, description, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          <div>
            {
              load
                ? <Carregando />
                : (
                  <form>
                    <input
                      placeholder="digite seu nome"
                      value={ nome }
                      data-testid="edit-input-name"
                      type="text"
                      name="nome"
                      onChange={ (e) => this.handleChange(e) }
                    />
                    <input
                      placeholder="digete seu email"
                      data-testid="edit-input-email"
                      value={ email }
                      name="email"
                      type="email"
                      onChange={ (e) => this.handleChange(e) }
                    />
                    <textarea
                      placeholder="digite sua descrição"
                      data-testid="edit-input-description"
                      value={ description }
                      name="description"
                      onChange={ (e) => this.handleChange(e) }
                    />
                    <input
                      placeholder="coloque a imagem"
                      data-testid="edit-input-image"
                      type="text"
                      name="image"
                      value={ image }
                      onChange={ (e) => this.handleChange(e) }
                    />
                    <button
                      type="button"
                      data-testid="edit-button-save"
                      onClick={ () => this.saveInfo() }
                      disabled={ isDisebled }
                    >
                      Salvar

                    </button>
                  </form>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = { history: PropTypes.func }.isRequired;

export default ProfileEdit;
