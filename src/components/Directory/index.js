import React from "react";
import { Link } from "react-router-dom";
import pexwearmens from "./../../assets/pexwearmens.jpg";
import pexwearwomens from "./../../assets/pexwearwomens.jpg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${pexwearwomens})`,
          }}
        >
          <Link to="/search/womens">Womens</Link>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${pexwearmens})`,
          }}
        >
          <Link to="/search/mens">Mens</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
