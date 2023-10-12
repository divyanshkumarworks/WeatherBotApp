import React, { useState, useEffect , Navigate } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function Settings() {
  const [newApiKey, setNewApiKey] = useState('');
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Make an HTTP request to your NestJS server to get the access token
    axios.get('http://localhost:4000/auth/access-token') // Adjust the URL
      .then((response) => {
        const { accessToken } = response.data;
        if (accessToken) {
          setAccessToken(accessToken);
          // Use the access token to make authenticated API requests.
          console.log('Access Token:', accessToken);
        } else {
          // Redirect to the login page or handle unauthorized access.
          // You can use react-router to navigate to the login page.
          navigate('/', { replace: true });
        }
      })
      .catch((error) => {
        console.error('Failed to fetch access token:', error);
        // Handle the error
        navigate('/', { replace: true });
      });
  }, []);

  const handleBotApiChange = (e) => {
    setNewApiKey(e.target.value);
  }

  console.log(newApiKey);

  const handleUpdateApiKey = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/api/update-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newApiKey }),
      });

      if (response.ok) {
        alert('API key updated successfully');
      } else {
        alert('Failed to update API key');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2 className="form-group m-3">Settings</h2>
      <form > 
            <div className="form-group m-3"> 
                <label htmlFor="id1" className="mb-2">Telegram Bot Api key</label> 
                <input className="form-control" type="text" 
                    id="id1" placeholder="Enter new api key" value={newApiKey} onChange={handleBotApiChange} /> 
            </div> 
            <div className="form-group m-3"> 
              <button type="button" className="btn btn-success" onClick={handleUpdateApiKey}> 
                  Update bot settings 
              </button>  
            </div> 
        </form> 
    </div>
  );
}

export default Settings;