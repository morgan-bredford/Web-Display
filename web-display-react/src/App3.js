import React, {Component} from 'react'

class App3 extends Component {
    state = { file: null }
  

    componentDidMount(){
        window.addEventListener('load', function() {
            document.querySelector('input[type="file"]').addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    var img = document.querySelector('img');  // $('img')[0]
                    img.src = URL.createObjectURL(this.files[0]); // set src to blob url
                    img.onload = this.imageIsLoaded;
                }
            });
          });
    }

    imageIsLoaded = () => { 
        console.log(this.src);  // blob url
        // update width and height ...
      }

    render() {

  
      return (
        <div >
            <input type='file' />
            <img id="myImg" src="#" alt="your image" /><br />
        </div>
      )
    }
  }
  
  export default App3