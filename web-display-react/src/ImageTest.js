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
    handleSubmit = () => {
        console.log(this.props.user)
        const newuser = this.props.user[0]
        newuser.image = this.state.image
        console.log(newuser)
        axios
          .post("http://127.0.0.1:8080/users/update", [newuser])
          .catch(err => {
            console.log(err.response.data.message)})
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
        this.setState({image: file})
        this.setState({imageUrl: URL.createObjectURL(file)})
        console.log(this.state.image)
    }
uploadImage3 = (event) => {
        const inpFile = event.target.files[0]
        console.log(event.target.files[0])
        // const endpoint = "./upload.php"
        const formData = new FormData()
        formData.append("inpFile", inpFile)
        axios
        .post('http://127.0.0.1:8080/upload',formData, {headers: {
            'Content-Type': 'multipart/form-data'}
          })
                .catch(err => {
                    console.log(err.response)})
        // const file = event.target.files[0]
        // this.setState({image: file})
        // this.setState({imageUrl: URL.createObjectURL(file)})
        // console.log(this.state.image)
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
                    <input type="file" accept="image/*" name="image" id="file" onChange={this.uploadImage3} style={{display: 'none'}} />
                <img src={this.state.imageUrl} />
                <button onClick={this.handleSubmit}>dont</button>
            </React.Fragment>
        )
    }

}

export default ImageTest