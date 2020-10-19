import React, {Component} from 'react'

class App2 extends Component {
    state = { file: null }
  
    onDrag = event => {
      event.preventDefault()
    }
  
    onDrop = event => {
      event.preventDefault()
      let file = event.dataTransfer.files[0]
      this.setState({ file })
    }
  
    render() {
      let { file } = this.state
      let url = file && URL.createObjectURL(file)
  
      return (
        <div onDragOver={this.onDrag} onDrop={this.onDrop}>
          <p>Drop an image!</p>
          <img src={url} />
        </div>
      )
    }
  }
  
  export default App2