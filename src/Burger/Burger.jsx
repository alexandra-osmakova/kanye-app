import React from 'react';
import cx from 'classnames';
import './Burger.css';
import { Menu } from '../Menu/Menu';


export class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);

    this.Menu = React.createRef();

    this.state = {
      burgerIsOpen: false
    }
  }

  callForInfo() {
    this.props.onClick();
  }

  changeBurger = () => {
    this.setState({
      burgerIsOpen: !this.state.burgerIsOpen,
    })
    this.Menu.current.changeMenuState();
  }


  render() {
    const { burgerIsOpen } = this.state;
    const { handlers } = this.props;

    return (
      <div onClick={this.changeBurger}>
        <Menu ref={this.Menu} handlers={handlers}/>
        <div className={cx('header_burger_menu', {
          'menu_state_open': burgerIsOpen
        })}>
          <div className="menu__icon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  }
}