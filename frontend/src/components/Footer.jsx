import React from "react";
import { Link } from "react-router-dom";

import styles from '../css/HeaderStyles.module.css'

function Footer() {
  return (
    <div id="quitFadeDown" className={styles.get_in_touch}>
      <h2>Want to contact me?</h2>
      <p>
        Feel free to contact me via email at:{" "}
        <a className={styles.get_in_touch_link}  href="mailto:dodkymull@gmail.com">
          dodkymull@gmail.com.
        </a>{" "}
        <br />
        Or send me an email through{" "}
        <Link to="/contact" className={styles.get_in_touch_link}>
          contact page.
        </Link>
      </p>
    </div>
  );
}

export default Footer;
