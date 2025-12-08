import "./App.css";

function App() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    fetch("/auth/authenticate", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          const urlParams = new URLSearchParams(window.location.search);
          const next = urlParams.get("next") || "/";
          window.location.href = next;
        } else {
          alert("Invalid password");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Authentication Required</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Authenticate</button>
      </form>
    </div>
  );
}

export default App;
