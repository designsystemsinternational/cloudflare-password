import styles from "./App.module.css";

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
      <div className={styles.logo}>
        <div>Design</div>
        <div>Systems</div>
        <div>International</div>
      </div>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1>Password required</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">
              Please enter your password to get access.
            </label>
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Authenticate</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
