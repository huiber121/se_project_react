import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="footer">
        Developed by Name Surname <span>{year}</span>
      </p>
    </footer>
  );
}

export default Footer;
