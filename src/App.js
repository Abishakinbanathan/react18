import { Suspense, useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(false); // Initially set to false
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  function getTodos() {
    setLoading(true); // Set loading to true when fetching data
    fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: "GET"
    }).then((res) => {
      res.json().then((data) => {
        // Simulating a delay of 3 seconds
        setTimeout(() => {
          setLoading(false); // Set loading to false after 3 seconds
          setUsers(data);
          setTotal(data.length);
        }, 3000);
      });
    });
  }

  useEffect(() => {
    console.log("Rendered");
  }, [loading, total]);

  return (
    <div className="App">
      <div
        style={{ backgroundColor: "red", width: "10%", padding: "10px", margin: "2%" }}
        onClick={getTodos}
      >
        Fetch
      </div>
      <p>Testing</p>
      <Suspense fallback={<div>Loading...</div>}>
        {loading ? ( // Show loading state
          <div>Loading...</div>
        ) : (
          <table cellPadding="5">
            <thead>
              <tr>
                <th>test from test</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Suspense>
    </div>
  );
}
