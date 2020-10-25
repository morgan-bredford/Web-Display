import React, { useState, useEffect } from "react";

function UserPage(props) {
  console.log(`userpage: ${props.user}`)
  return (
    <div>
    {props.user[0] ? <div>
      <ul>
        <li>{props.user[0].username}</li>
        <li>{props.user[0].password}</li>
        <li>{props.user[0].firstname}</li>
        <li>{props.user[0].lastname}</li>
        <li>{props.user[0].gender}</li>
        <li>{props.user[0].key}</li>
      </ul>
    </div> : "no props"}</div>
  );
}

export default UserPage;