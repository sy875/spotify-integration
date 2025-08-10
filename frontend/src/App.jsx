import React, { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle OAuth redirect tokens in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      // Fetch current user
      fetch("http://localhost:3000/api/v1/auth/current-user", {
        headers: { Authorization: `Bearer ${storedAccessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?._id) {
            console.log(data)
            setUser(data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const loginWithGoogle = () => {
    window.open("http://localhost:3000/api/v1/auth/google", "_self");
  };

  const loginWithSpotify = () => {
    window.open("http://localhost:3000/api/v1/auth/spotify", "_self");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setArtists([]);
  };

  // Fetch followed artists manually
  const fetchFollowedArtists = () => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (!storedAccessToken) return;

    setLoading(true);
    fetch("http://localhost:3000/api/v1/spotify/followed-artist", {
      headers: { Authorization: `Bearer ${storedAccessToken}` },
    })
      .then((res) => res.json())
      .then((artistData) => {
        if (artistData?.artists?.items) {
          setArtists(artistData.artists.items);
        } else {
          setArtists([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "50px" }}>
      {!user ? (
        <>
          <h1>Login</h1>
          <button onClick={loginWithGoogle} style={btnStyle}>
            Login with Google
          </button>
          <br />
          <br />
          <button onClick={loginWithSpotify} style={btnStyle}>
            Login with Spotify
          </button>
        </>
      ) : (
        <>
          <h1>Welcome, {user.name || user.username}</h1>
          <img
            src={user.avatar?.url || user.picture}
            alt="profile"
            style={{ borderRadius: "50%", width: "80px", height: "80px" }}
          />
          <p>Email: {user.email}</p>

          <button onClick={fetchFollowedArtists} style={{ ...btnStyle, backgroundColor: "#1DB954" }}>
            {loading ? "Loading..." : "Fetch Top Followed Artists"}
          </button>

          <h2>Your Followed Artists</h2>
          {artists.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {artists.map((artist) => (
                <li key={artist.id} style={{ marginBottom: "10px" }}>
                  <img
                    src={artist.images?.[0]?.url}
                    alt={artist.name}
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                  <span style={{ marginLeft: "10px" }}>{artist.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No followed artists found.</p>
          )}

          <button onClick={logout} style={btnStyle}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

const btnStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#4285F4",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

export default App;
