function About() {
  return (
    <div className="d-grid">
      <label className="form-label text-muted">What is this website?</label>
      top90 provides a real-time feed and searchable index of soccer goals from around the world.
      <br></br>
      <br></br>
      <label className="form-label text-muted">What leagues are on here?</label>
      <ul>
        <li>Premier League</li>
        <li>Champions League</li>
        <li>Europa League</li>
        <li>FA Cup</li>
      </ul>
      <label className="form-label text-muted">Want to contribute?</label>
      <a href="https://github.com/wweitzel/top90-backend/issues">
        https://github.com/wweitzel/top90-backend/issues
      </a>
    </div>
  );
}

export default About;
