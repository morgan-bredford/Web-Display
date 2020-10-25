import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";

function Im() {

    const handleFile = (event) => {
        let file = event.target.files[0];
        readFile(file,cb)
    }

    function readFile(file, cb) {
        let myReader = new FileReader();
        myReader.onloadend = function (e) {
            cb(myReader.result);
        };
        console.log(myReader.readAsDataURL(file)
        )
    };

    function cb(base64string) {
        /*do next steps here like sending image base64string to the server.*/
        console.log("cb")
        axios
        .post("http://127.0.0.1:5000/users/image", {msg: base64string})
        .then((res) => console.log(res))
        .catch(err => {
            console.log(err.response)})
    }

    return(
        <div>
            <input type="file" id="myFile" onChange={handleFile} /> 
        </div>
    )
}

export default Im
