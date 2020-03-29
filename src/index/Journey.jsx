import React from "react";
import "./Journey.css";
import switchImg from "./imgs/switch.svg";

export default function Joumey(props) {
  const { from, to, exchangeFromTo, showCitySelector } = props;
  return (
    <div className="journey">
      <div className="journey-sation" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={switchImg} alt="" />
      </div>
      <div className="journey-sation" onClick={() => showCitySelector(false)}>
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div>
  );
}
