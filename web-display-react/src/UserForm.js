import React from 'react'
// import UserForm from 'react-hook-form'
// const {register,handleSubmit,errors} = useForm()

function UserForm(){

    const [value,setValue] = React.useState('')

    function handleSubmit(e){
        e.preventDefault()
        
        // e.target.elements.map(elem => {
        //     console.log(elem)
        // })
        console.log(e.target.elements["gender"].value)
        console.log(e.target.elements.length)
        for(let i = 0; i<e.target.elements.length ; i++){
            console.log(e.target.elements[i].value)
        }
    }

    function handleChange(e){
        setValue(e.target.value)
    }

    return(
        <form className="myform" onSubmit={handleSubmit}>
            <input type="text" name="name" onChange={handleChange} placeholder="name" />
            <input type="text" name="gender" onChange={handleChange} placeholder="gender" />
            <input type="text" name="height" onChange={handleChange} placeholder="height" />
            <textarea />
            <button>Submit</button>
            {value}
        </form>
    )
}

export default UserForm