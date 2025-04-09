import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vraagNr: 0,
      score: 0,
      stop: false,
    };


  }
  componentDidMount() {
    this.getData();
  }
  
  getData() {
    fetch('http://localhost:8080/quiz/api-get')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        jsonLoaded: true,
        jsonData: data
      });
    })
    .catch(console.log);
  }
  handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      this.setState({ score: this.state.score + 1 });
    }

    if (this.state.vraagNr < this.state.jsonData.length - 1) {
      this.setState({ vraagNr: this.state.vraagNr + 1 });
    } else {
      this.setState({ stop: true });
    }
  };

  render() {
    if ( ! this.state.jsonLoaded ) {
      return (  <div className="app">loading...</div>)
    }
    const { vraagNr, stop, score } = this.state;
    const antwoorden = this.state.jsonData[vraagNr].answerOptions;

    return (
      <div className="app">
        {stop ? (
          <div className="score">
            Jouw score is {score} van de {this.state.jsonData.length}
          </div>
        ) : (
          <>
            <div className="column">
              <span>
                Vraag {vraagNr + 1} van {this.state.jsonData.length}
              </span>
              <span className="question">
                {this.state.jsonData[vraagNr].questionText}
              </span>
            </div>
            <div className="column uitlijnen">
              {antwoorden.map((antwoord, index) => (
                <button
                  key={index}
                  onClick={() => this.handleAnswerOptionClick(antwoord.isCorrect)}
                >
                  {antwoord.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
