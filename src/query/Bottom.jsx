import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { ORDER_DEPART, ORDER_DURATION } from "./constant";
import classnames from "classnames";
import Slider from "./Slider";
import "./Bottom.css";

const Filter = memo(function Filter(props) {
  const { name, checked, toggle, value } = props;
  return (
    <li
      className={classnames({ checked })}
      onClick={() => {
        toggle(value);
      }}
    >
      {name}
    </li>
  );
});

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const Option = memo(function Options(props) {
  const { title, options, checkedMap, update } = props;
  const toggle = useCallback(
    value => {
      const newCheckedMap = { ...checkedMap };
      if (value in checkedMap) {
        delete newCheckedMap[value];
      } else {
        newCheckedMap[value] = true;
      }
      update(newCheckedMap);
    },
    [checkedMap, update]
  );

  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map(option => {
          return (
            <Filter
              key={option.value}
              {...option}
              checked={option.value in checkedMap}
              toggle={toggle}
            />
          );
        })}
      </ul>
    </div>
  );
});

Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
};

const BottomModal = memo(function BottomModal(props) {
  const {
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStatins,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    setCheckedArriveStatins,
    setCheckedDepartStations,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setDepartTimeEnd,
    setArriveTimeEnd,
    setArriveTimeStart,
    setDepartTimeStart,
    toggleIsFiltersVisible
  } = props;

  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState({
    ...checkedTicketTypes
  });
  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState({
    ...checkedTrainTypes
  });
  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState({
    ...checkedDepartStations
  });
  const [localCheckedArriveStatins, setLocalCheckedArriveStatins] = useState({
    ...checkedArriveStatins
  });

  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(
    departTimeStart
  );

  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(
    arriveTimeStart
  );
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

  const optionGroup = [
    {
      title: "坐席类型",
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      update: setLocalCheckedTicketTypes
    },
    {
      title: "车次类型",
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes
    },
    {
      title: "出发车站",
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations
    },
    {
      title: "到达车站",
      options: arriveStations,
      checkedMap: localCheckedArriveStatins,
      update: setLocalCheckedArriveStatins
    }
  ];
  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className="reset">重置</span>
            <span className="ok">确定</span>
          </div>
          <div className="options">
            {optionGroup.map(group => (
              <Option {...group} key={group.title} />
            ))}
            <Slider
              title="出发时间"
              currentStartHours={localDepartTimeStart}
              currentEndHours={localDepartTimeEnd}
              onStartChange={setLocalDepartTimeStart}
              onEndChanged={setLocalDepartTimeEnd}
            />
            <Slider
              title="到达时间"
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChange={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

BottomModal.propTypes = {
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStatins: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  setCheckedArriveStatins: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired
};

export default function Bottom(props) {
  const {
    orderType,
    isFiltersVisible,
    highSpeed,
    onlyTickets,
    toggleHighSpeed,
    toggleIsFiltersVisible,
    toggleOnlyTickets,
    toggleOrderType,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStatins,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    setCheckedArriveStatins,
    setCheckedDepartStations,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setDepartTimeEnd,
    setArriveTimeEnd,
    setArriveTimeStart,
    setDepartTimeStart
  } = props;
  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={toggleOrderType}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? "出发 早→晚" : "耗时 短→长"}
        </span>
        <span
          onClick={toggleHighSpeed}
          className={classnames("item", { "item-on": highSpeed })}
        >
          <i className="icon">{highSpeed ? "\uf43f" : "\uf43e"}</i>
          只看高铁动车
        </span>
        <span
          onClick={toggleOnlyTickets}
          className={classnames("item", { "item-on": onlyTickets })}
        >
          <i className="icon">{onlyTickets ? "\uf43d" : "\uf43c"}</i>
          只看有票
        </span>
        <span
          onClick={toggleIsFiltersVisible}
          className={classnames("item", { "item-on": isFiltersVisible })}
        >
          <i className="icon">{"\uf0f7"}</i>
          综合筛选
        </span>
      </div>
      {isFiltersVisible && (
        <BottomModal
          checkedTicketTypes={checkedTicketTypes}
          checkedTrainTypes={checkedTrainTypes}
          checkedDepartStations={checkedDepartStations}
          checkedArriveStatins={checkedArriveStatins}
          departTimeStart={departTimeStart}
          departTimeEnd={departTimeEnd}
          arriveTimeStart={arriveTimeStart}
          arriveTimeEnd={arriveTimeEnd}
          ticketTypes={ticketTypes}
          trainTypes={trainTypes}
          departStations={departStations}
          arriveStations={arriveStations}
          setCheckedArriveStatins={setCheckedArriveStatins}
          setCheckedDepartStations={setCheckedDepartStations}
          setCheckedTicketTypes={setCheckedTicketTypes}
          setCheckedTrainTypes={setCheckedTrainTypes}
          setDepartTimeEnd={setDepartTimeEnd}
          setArriveTimeEnd={setArriveTimeEnd}
          setArriveTimeStart={setArriveTimeStart}
          setDepartTimeStart={setDepartTimeStart}
          toggleIsFiltersVisible={toggleIsFiltersVisible}
        />
      )}
    </div>
  );
}

Bottom.propTypes = {
  orderType: PropTypes.number.isRequired,
  isFiltersVisible: PropTypes.bool.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleOrderType: PropTypes.func.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStatins: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  setCheckedArriveStatins: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired
};
