import Auth from './OAuthLink';
import Groups from './Groups';
import useCurrentUri from './useCurrentUri';
import useWebexOAuth from './useWebexOAuth';

import './App.css';

function App() {
  const webexToken = useWebexOAuth();  
  const redirectURI = useCurrentUri();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Webex Groups</h1>
        <h3>A GUI Interface for the <a href="https://developer.webex.com/docs/api/v1/groups">Webex Groups API</a></h3>
      </header>
      <div className='Main'>
      { 
          webexToken ? 
          (
            <Groups token={webexToken} />
          ) : 
          (
            <div className='Login'>
              {"To use this tool, login with an organization admin user: "}
              <Auth 
                clientID={process.env.REACT_APP_WEBEX_CLIENT_ID} 
                loginText="Login to Webex"
                redirectURI={redirectURI}
                webexAPIBaseURL={process.env.REACT_APP_WEBEX_BASE_URL}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
