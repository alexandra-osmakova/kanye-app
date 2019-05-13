import React from 'react';
import request from 'request';

import './App.css';
import defaultPicture from './img/default_pic.jpeg';
import { Refresh } from './Refresh';
import { BurgerMenu } from './Burger/Burger';
import cx from 'classnames';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: defaultPicture,
      content: undefined,
      picsArr: undefined,
      picsState: false,
      picsCounter: undefined
    }

    this.getNotKanyePic();
    this.refreshAll();
  }

  pics = [];

  refreshAll = () => {
    const { picsState, picsCounter, currentPic } = this.state;
    if (picsState === true && picsCounter >= 0) {
      this.setState({
        picsCounter: picsCounter - 1
      })
      this.showNotKanyePic()
    } else if (picsState === true && picsCounter < 0) {
      this.setState({
        picsCounter: currentPic.length - 1
      }, () => {
        this.showNotKanyePic();
      });
    } else if(picsState === false) {
      this.getPics();
      this.getQuote();
    }
  }

  refreshQuote = () => {
    this.setState({
      picsState: false
    }, () => {
      this.refreshAll();
    });
  }


  getInfo = () => {
    return {
      info: this.getAboutInfo,
      quotes: this.refreshQuote,
      pics: this.showNotKanyePic,
      contacts: this.getContactsInfo
    }
  }

  getContactsInfo = () => {
    const contacts = <a href="https://twitter.com/kanyewest">
      <span>🥺</span>Twitter<span>🥺</span>
    </a>;
    this.setState({
      content: <p>{contacts}</p>,
      picsState: undefined
    })
  }

  getNotKanyePic = () => {
    const url = 'https://api.unsplash.com/collections/4755909/photos/?client_id=9d5cb33c540edcf228b9c9ff3077d9a8d8719b1dcca91f9a5821e9966f7fd57a';

    request(url, (error, response, body) => {
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        this.setState({
          currentPic: data.map(function (el) {
            return el.urls.small
          }),
          picsCounter: data.length - 1
        })
      } else {
        console.error('error:', error);
      }
    });
  }

  showNotKanyePic = () => {
    const { currentPic, picsCounter } = this.state;
    const picToShow = currentPic[picsCounter];
    this.setState({
      content: <div className="current_kanye_pic_holder">
        <img src={picToShow} alt="" />
        <p>NOT KANYE</p>
      </div>,
      picsState: true,
      picsCounter: picsCounter-1
    })
  }

  getAboutInfo = () => {
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Kanye_West'

    request(url, (error, response, body) => {
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        this.setState({
          content: <p>{data.extract}</p>,
          picsState: undefined
        })
      } else {
        console.error('error:', error);
      }
    });
  }


  getPics = () => {
    const url = 'https://api.unsplash.com/photos/random/?client_id=9d5cb33c540edcf228b9c9ff3077d9a8d8719b1dcca91f9a5821e9966f7fd57a';

    request(url, (error, response, body) => {
      if (response.statusCode === 200) {
        const data = JSON.parse(body)
        this.setState({
          picture: data.urls.regular
        })
      } else {
        this.setState({
          picture: defaultPicture
        })
        console.error('error:', error);
      }
    });

  }

  getQuote = () => {
    const url = 'https://api.kanye.rest';

    request(url, (error, response, body) => {
      if (response.statusCode === 200) {
        const data = JSON.parse(body)
        this.setState({
          content: <q>{data.quote}</q>,
          picsState: false
        })
      } else {
        console.error('error:', error);
      }
    });
  }

  render() {
    const { picture, content, picsState } = this.state;

    return (
      <div className="App">
        <div className='pic_holder' style={{ backgroundImage: `url(${picture})` }}>
          <div className="pic_holder__wrap"></div>
          <BurgerMenu handlers={this.getInfo()} />
          <h1>Kanye for today</h1>
          <div className="pic_holder__content" >
            <div className="pic_holder__content_item" >
              {content}
            </div>
          </div>
          <button className={cx('refresh_btn', {
                'invisible_item': picsState === undefined
            })}
          onClick={() => this.refreshAll()} >
            <Refresh />
          </button>
        </div>
      </div>
    );
  }
}

export default App;