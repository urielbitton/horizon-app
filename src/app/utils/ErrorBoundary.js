import React from 'react'
import errorBoundaryImg from '../assets/imgs/error-boundary-bg.png'

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <img src={errorBoundaryImg} alt=""/>
          <h1>An error occured on this page</h1>
          <h6>Don't worry we're working on fixing this bug so it doesn't happen again.</h6>
          <a href="/">
            <button>
              <i className="fal fa-home"></i>
              Back Home
            </button>
          </a>
        </div>
      )
    }
    return this.props.children; 
  }
}

export default ErrorBoundary