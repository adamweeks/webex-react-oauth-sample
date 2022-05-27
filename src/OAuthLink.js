import PropTypes from 'prop-types';

function OAuthLink({clientID, loginText, redirectURI, webexAPIBaseURL}) {
  
  
  return (
    <>
      <a
      href={`${webexAPIBaseURL}?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=identity%3Agroups_rw%20identity%3Agroups_read`}
      >
        {loginText}
      </a>
    </>
  );
}

OAuthLink.propTypes = {
  clientID: PropTypes.string.isRequired,
  loginText: PropTypes.string.isRequired,
  redirectURI: PropTypes.string.isRequired,
  webexAPIBaseURL: PropTypes.string.isRequired
};

export default OAuthLink;