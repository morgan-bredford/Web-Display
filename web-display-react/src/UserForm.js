import React from "react";
import axios from "axios";
// import UserForm from 'react-hook-form'
// const {register,handleSubmit,errors} = useForm()

function UserForm() {
  const [value, setValue] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const formdata = new FormData(e.target);
    console.log(formdata.get("gender"));
    axios
      .post("http://127.0.0.1:5000", formdata)
      .then((res) => console.log(res));
    // console.log(e.target.elements["gender"].value)
    // console.log(e.target.elements.length)
    // for(let i = 0; i<e.target.elements.length ; i++){
    //     console.log(e.target.elements[i].value)
    // }
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <form name="createUserForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        placeholder="name"
      />
      <input
        type="text"
        name="gender"
        onChange={handleChange}
        placeholder="gender"
      />
      <input
        type="text"
        name="height"
        onChange={handleChange}
        placeholder="height"
      />
      <textarea />
      <button>Submit</button>
      {value}
    </form>
  );
}

export default UserForm;
