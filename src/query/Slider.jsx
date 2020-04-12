import React, { memo, useState, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Slider.css";
import useWinSize from "../common/useWinSize";
import leftPad from "left-pad"; //补0

const Slider = memo(function Slider(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChange,
    onEndChanged
  } = props;

  const winSize = useWinSize();

  const startHandle = useRef();
  const endHandle = useRef();
  const lastStartX = useRef();
  const lastEndX = useRef();
  const range = useRef();
  const rangeWidth = useRef();

  const prevCurrentStartHours = useRef(currentEndHours);
  const prevCurrentEndHours = useRef(currentEndHours);

  const [start, setStart] = useState(() => (currentStartHours / 24) * 100);
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);

  if (prevCurrentStartHours.current !== currentStartHours) {
    setStart((currentStartHours / 24) * 100);
    prevCurrentStartHours.current = currentStartHours;
  }
  if (prevCurrentEndHours.current !== currentEndHours) {
    setEnd((currentEndHours / 24) * 100);
    prevCurrentEndHours.current = currentEndHours;
  }

  const startPercent = useMemo(() => {
    if (start > 100) {
      return 100;
    }
    if (start < 0) {
      return 0;
    }
    return start;
  }, [start]);
  const endtPercent = useMemo(() => {
    if (end > 100) {
      return 100;
    }
    if (end < 0) {
      return 0;
    }
    return end;
  }, [end]);
  const startHours = useMemo(() => {
    return Math.round((startPercent * 24) / 100);
  }, [startPercent]);

  const endtHours = useMemo(() => {
    return Math.round((endtPercent * 24) / 100);
  }, [endtPercent]);
  const startText = useMemo(() => {
    return leftPad(startHours, 2, "0") + ":00";
  }, [startHours]);
  const endtText = useMemo(() => {
    return leftPad(endtHours, 2, 0) + ":00";
  }, [endtHours]);

  function onStartTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastStartX.current = touch.pageX;
  }

  function onEndTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastEndX.current = touch.pageX;
  }

  function onStartTouchMove(e) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastStartX.current;
    lastStartX.current = touch.pageX;
    setStart(start => start + (distance / rangeWidth.current) * 100);
  }

  function onEndTouchMove(e) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastEndX.current;
    lastEndX.current = touch.pageX;
    setEnd(end => end + (distance / rangeWidth.current) * 100);
  }

  useEffect(() => {
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    );
  }, [winSize.width]);

  useEffect(() => {
    startHandle.current.addEventListener(
      "touchstart",
      onStartTouchBegin,
      false
    );
    startHandle.current.addEventListener("touchmove", onStartTouchMove, false);
    endHandle.current.addEventListener("touchstart", onEndTouchBegin, false);
    endHandle.current.addEventListener("touchmove", onEndTouchMove, false);
    return () => {
      startHandle.current.removeEventListener(
        "touchstart",
        onStartTouchBegin,
        false
      );
      startHandle.current.removeEventListener(
        "touchmove",
        onStartTouchMove,
        false
      );
      endHandle.current.removeEventListener(
        "touchstart",
        onEndTouchBegin,
        false
      );
      endHandle.current.removeEventListener("touchmove", onEndTouchMove, false);
    };
  });

  useEffect(() => {
    onStartChange(startHours);
  }, [startHours]);
  useEffect(() => {
    onEndChanged(endtHours);
  }, [endtHours]);
  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div
            className="slider-range"
            style={{
              left: startPercent + "%",
              width: endtPercent - startPercent + "%"
            }}
          ></div>
          <i
            className="slider-handle"
            ref={startHandle}
            style={{
              left: startPercent + "%"
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endHandle}
            className="slider-handle"
            style={{
              left: endtPercent + "%"
            }}
          >
            <span>{endtText}</span>
          </i>
        </div>
      </div>
    </div>
  );
});

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  currentStartHours: PropTypes.number.isRequired,
  currentEndHours: PropTypes.number.isRequired,
  onStartChange: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired
};

export default Slider;
