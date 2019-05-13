import React from 'react';
import './Menu.css';
import cx from 'classnames';


export class Menu extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            menuIsOpen: false,
            menuClickedCurrent: undefined
        }
    }

    changeMenuState = () => {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen
        })
    }


    menuClickEvent = (event) => {
        const { handlers } = this.props;
        const currentId = event.target.id;
        const currentHandler = handlers[currentId];

        if (typeof currentHandler === 'function') {
            currentHandler();
        }
    }

    render() {
        const { menuIsOpen } = this.state;
        return (
            <div className={cx('menu', {
                'menu_closed': !menuIsOpen
            })}>
                <nav>
                    <ul onClick={this.menuClickEvent}>
                        <li id="quotes">Quotes</li>
                        <li id='info'>Info</li>
                        <li id='pics'>Pics</li>
                        <li id='contacts'>Contacts</li>
                    </ul>
                </nav>
            </div>
        );
    }
}