import React from 'react'
import axios from 'axios'

class ImageTest extends React.Component {
    constructor(){
        super()
        this.state = {
            image: null,
            imageUrl: null
        }
    }

    uploadImage = (event) => {
        const inpFile = document.getElementById('file')
        console.log(inpFile.files)
        const endpoint = "./upload.php"
        const formData = new FormData()
        formData.append("inpFile", inpFile.files[0])
        axios
        .post('http://127.0.0.1:8080/users/image',formData)
                .catch(err => {
                    console.log(err.response)})
        const file = event.target.files[0]
        this.image = file
        this.setState({imageUrl: URL.createObjectURL(file)})
    }

    uploadImage2 = (e) => {
        const inpFile = e.target.files[0]
        this.readFile(inpFile,this.cb)
    }
    readFile = (file, cb) => {
        let myReader = new FileReader();
        myReader.onloadend = function (e) {
            cb(myReader.result);
        };
        myReader.readAsDataURL(file);
    };
   cb = (base64string) => {
        /*do next steps here like sending image base64string to the server.*/
        axios
        .post('http://127.0.0.1:8080/users/image',base64string)
                .catch(err => {
                    console.log(err.response)})
    }
    render() {
        return(
            <React.Fragment>
                <br /><br />
                    <label htmlFor='file'>upload</label>
                    <input type="file" accept="image/*" name="image" id="file" onChange={this.uploadImage2} style={{display: 'none'}} />
                <img src={this.state.imageUrl} />
            </React.Fragment>
        )
    }

}

export default ImageTest