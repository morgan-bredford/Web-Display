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
        .post(endpoint,formData)
                .catch(err => {
                    console.log(err.response)})
        // const file = event.target.files[0]
        // this.image = file
        // this.setState({imageUrl: URL.createObjectURL(file)})
    }

    render() {
        return(
            <React.Fragment>
                <br /><br />
                    <label htmlFor='file'>upload</label>
                    <input type="file" accept="image/*" name="image" id="file" onChange={this.uploadImage} style={{display: 'none'}} />
                <img src={this.state.imageUrl} />
            </React.Fragment>
        )
    }

}

export default ImageTest