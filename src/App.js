import React, { Component } from 'react';
import './App.scss';

class RandomQuoteMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quoteIndex: 0,
      numOfQuotes: 0,
      color: `rgba(${this.randomNumber()},${this.randomNumber()},${this.randomNumber()},1)`
    };
    this.newQuote = this.newQuote.bind(this);
    this.randomNumber = this.randomNumber.bind(this);
  }

  randomNumber(min = 0, max = 255) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  newQuote() {
    this.setState(state => ({
      color: `rgba(${this.randomNumber()}, ${this.randomNumber()}, ${this.randomNumber()}, 1)`,
      quoteIndex: state.numOfQuotes > 0 && this.randomNumber(0, state.numOfQuotes-1)
    }));
  }

  componentDidMount() {
    fetch("https://gist.githubusercontent.com/i-anshuman/b36424369dccf13d9865f7c6ca2147b2/raw/ec0666f58889eebb94073fc8d2d151d36e64ac66/quotes.min.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            quotes: result.quotes,
            numOfQuotes: result.quotes.length,
          }, () => this.newQuote());
        },
        (error) => {
          this.setState({
            numOfQuotes: -1,
            error
          });
        }
      );
  }

  render() {
    let randomQuote = this.state.numOfQuotes > 0 ? this.state.quotes[this.state.quoteIndex] : null;
    return (
      <main style={{backgroundColor: this.state.color, color: this.state.color}}>
        <div className="wrapper">
          <div className="quote-box" id="quote-box">
            <div className="quote-box__quote">
              {randomQuote && <i className="fa fa-quote-left"></i>}
              <span id="text">
                {randomQuote ? randomQuote.quote : (this.state.numOfQuotes === -1 ? this.state.error.message : "Loading Quote...")}
              </span>
            </div>
            {randomQuote && <div className="quote-box__author">- <span id="author">{randomQuote.author}</span></div>}
            {
              randomQuote &&
              <div className="button-group">
                <div className="button-group__social">
                  <a href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(randomQuote.quote + "  " + randomQuote.author)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    id="tweet-quote"
                    style={{backgroundColor: this.state.color}}
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(randomQuote.author)}&content=${encodeURIComponent(randomQuote.quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    style={{backgroundColor: this.state.color}}
                  >
                    <i className="fa fa-tumblr"></i>
                  </a>
                </div>
                <button className="button"
                  style={{backgroundColor: this.state.color}}
                  id="new-quote"
                  onClick={this.newQuote}
                >
                  New quote
                </button>
              </div>
            }
          </div>
          <footer>by Anshuman for FreeCodeCamp</footer>
        </div>
      </main>
    );
  }
}

export default RandomQuoteMachine;
