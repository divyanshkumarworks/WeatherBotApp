import React, { useState, useEffect } from 'react'


const UserManagement = () => {
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:4000/user') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  function handleDelete(id) {
    fetch(`http://127.0.0.1:4000/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Resource deleted successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  return (
    <div>
     <div className = "row">
     </div>
     <br></br>
     <div className = "row">
      <h2 className="m-2">Users List</h2>
        <table className = "table table-striped table-bordered m-2">

            <thead>
                <tr>
                    <th> First Name</th>
                    <th> Last Name</th>
                    <th> Location</th>
                    <th> is_block</th>
                </tr>
            </thead>
            <tbody>
                {
                  users.map(
                      user => 
                      <tr key = {user._id}>
                           <td> { user.first_name} </td>   
                           <td> {user.last_name}</td>
                           <td> {user.location}</td>
                           <td> {(user.is_block) ? "True" : "False"}</td>
                           <td>
                               <button onClick={() => handleDelete(user._id)} style={{marginLeft: "10px"}} className="btn btn-danger">Delete</button>
                           </td>
                      </tr>
                  )
                }
            </tbody>
        </table>
     </div>
    </div>
  )
}

export default UserManagement