import Proptypes from 'prop-types';
import React from 'react';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginValue: '',
      isEnterBtnDisebled: true,
      waitFunc: false,
    };
  }

  changeLogin = (event) => {
    const { value } = event.target;
    this.setState({
      loginValue: value,
    }, () => this.btnDisebled());
  }

  btnDisebled = () => {
    const { loginValue } = this.state;
    const rule = 3;
    if (loginValue.length >= rule) {
      this.setState({
        isEnterBtnDisebled: false,
      });
    } else {
      this.setState({
        isEnterBtnDisebled: true,
      });
    }
  }

  btnEnterFunc = async () => {
    const { loginValue } = this.state;
    const { history } = this.props;
    const chave = {
      name: loginValue,
    };
    this.setState({ waitFunc: true });
    await createUser(chave);
    this.setState({ waitFunc: false });
    history.push('/search');
  }

  render() {
    const {
      isEnterBtnDisebled,
      waitFunc,
    } = this.state;
    return (
      <div data-testid="page-login">
        <header>
          <h1> Desenvolvimento by: R.A.A.M XD</h1>
        </header>
        {waitFunc
          ? <Carregando />
          : (
            <div>
              <form>
                <input
                  type="text"
                  data-testid="login-name-input"
                  onChange={ (event) => this.changeLogin(event) }
                />
                {' '}
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ isEnterBtnDisebled }
                  onClick={ () => this.btnEnterFunc() }
                >
                  Entrar
                </button>
              </form>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = { history: Proptypes.string }.isRequired;

export default Login;
