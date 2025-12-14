import { useEffect, useState } from "react";
import "./useradmin.css";
import {useNavigate} from 'react-router-dom'
import { ScaleLoader } from "react-spinners";
function UsersAdmin() {
  //https://abhotel.josephteka.com/api/users
const navigate = useNavigate()
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [deleteuser, setDeletUser] = useState(null);

  const fetchUsers=async()=>{
    try {
      setLoading(true)
      const res = await fetch(`https://abhotel.josephteka.com/api/getusers`)
      const data = await res.json()
      setUsers(data)
      setLoading(false)
      
    } catch (error) {
      setError('Failed to fetch users' + error.message);
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchUsers()
  }, [])


  const handleDelet=async(id)=>{
    try {
      setLoading(true)
      setError('')
      
      const res = await fetch(`https://abhotel.josephteka.com/api/deleteusers/${id}`, {method:'DELETE'});
      const data = await res.json();
      setLoading(false)
      setDeletUser(null)
      fetchUsers()
    } catch (error) {
      setError('Failed to delete user: ' + error.message);
      setLoading(false)
    }
  }




  return (
    <div className="user-container">
      <h2>Users List</h2>
      {loading && <div className="loader-container">
        <ScaleLoader />
      </div>}
      {error && <div className="error-message">{error}</div>}

      <table className="user-table">
        <thead>
          <tr>
            <th>Edit</th>
            <th>Delete</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <button style={{ background: "red" }} onClick={()=>navigate(`/editusers/${u.id}`)} >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelet(u.id)}
                  style={{ background: "red" }}
                >
                  {deleteuser === u.id ? `Deleting` : `Delete`}
                </button>
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersAdmin
