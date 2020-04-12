import React, { memo, useState, useCallback, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import { ORDER_DEPART } from "./constant";
import classnames from "classnames";
import Slider from "./Slider";
import "./Bottom.css";

function checkedReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "toggle": {
      const newState = { ...state };
      if (payload in newState) {
        delete newState[payload];
      } else {
        newState[payload] = true;
      }
      return newState;
    }
    case "reset":
      return {};
    default:
  }
  return state;
}

const Filter = memo(function Filter(props) {
  const { name, checked, dispatch, value } = props;
  return (
    <li
      className={classnames({ checked })}
      onClick={() => {
        dispatch({ payload: value, type: "toggle" });
      }}
    >
      {name}
    </li>
  );
});

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const Option = memo(function Options(props) {
  const { title, options, checkedMap, dispatch } = props;

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
              dispatch={dispatch}
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
  dispatch: PropTypes.func.isRequired
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

  const [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(
    checkedReducer,
    checkedTicketTypes,
    checkedTicketTypes => {
      return {
        ...checkedTicketTypes
      };
    }
  );
  const [localCheckedTrainTypes, localCheckedTrainTypesDispatch] = useReducer(
    checkedReducer,
    checkedTrainTypes,
    checkedTrainTypes => {
      return {
        ...checkedTrainTypes
      };
    }
  );
  const [
    localCheckedDepartStations,
    localCheckedDepartStationsDispatch
  ] = useReducer(
    checkedReducer,
    checkedDepartStations,
    checkedDepartStations => {
      return {
        ...checkedDepartStations
      };
    }
  );
  const [
    localCheckedArriveStatins,
    localCheckedArriveStatinsDispatch
  ] = useReducer(checkedReducer, checkedArriveStatins, checkedArriveStatins => {
    return {
      ...checkedArriveStatins
    };
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
      dispatch: localCheckedTicketTypesDispatch
    },
    {
      title: "车次类型",
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      dispatch: localCheckedTrainTypesDispatch
    },
    {
      title: "出发车站",
      options: departStations,
      checkedMap: localCheckedDepartStations,
      dispatch: localCheckedDepartStationsDispatch
    },
    {
      title: "到达车站",
      options: arriveStations,
      checkedMap: localCheckedArriveStatins,
      dispatch: localCheckedArriveStatinsDispatch
    }
  ];

  function sure() {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTrainTypes(localCheckedTrainTypes);
    setCheckedDepartStations(localCheckedDepartStations);
    setCheckedArriveStatins(localCheckedArriveStatins);
    setDepartTimeStart(localDepartTimeStart);
    setDepartTimeEnd(localArriveTimeEnd);
    setArriveTimeStart(localArriveTimeStart);
    setArriveTimeEnd(localArriveTimeEnd);
    toggleIsFiltersVisible();
  }

  const isResetDisabled = useMemo(() => {
    return (
      Object.keys(localCheckedTicketTypes).length === 0 &&
      Object.keys(localCheckedTrainTypes).length === 0 &&
      Object.keys(localCheckedDepartStations).length === 0 &&
      Object.keys(localCheckedArriveStatins).length === 0 &&
      localDepartTimeEnd === 24 &&
      localArriveTimeStart === 0 &&
      localArriveTimeEnd === 24 &&
      localDepartTimeStart === 0
    );
  }, [
    localCheckedTicketTypes,
    localCheckedTrainTypes,
    localCheckedDepartStations,
    localCheckedArriveStatins,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd,
    localDepartTimeStart
  ]);
  console.log(isResetDisabled);

  function reset() {
    if (isResetDisabled) {
      return;
    }
    localCheckedTicketTypesDispatch({ type: "reset" });
    localCheckedTrainTypesDispatch({ type: "reset" });
    localCheckedDepartStationsDispatch({ type: "reset" });
    localCheckedArriveStatinsDispatch({ type: "reset" });
    setLocalArriveTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalDepartTimeEnd(24);
    setLocalDepartTimeStart(0);
  }

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span
              className={classnames("reset", { disabled: isResetDisabled })}
              onClick={reset}
            >
              重置
            </span>
            <span className="ok" onClick={sure}>
              确定
            </span>
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

  const noChecked = useMemo(() => {
    return (
      Object.keys(checkedTicketTypes).length === 0 &&
      Object.keys(checkedTrainTypes).length === 0 &&
      Object.keys(checkedDepartStations).length === 0 &&
      Object.keys(checkedArriveStatins).length === 0 &&
      departTimeEnd === 24 &&
      arriveTimeStart === 0 &&
      arriveTimeEnd === 24 &&
      departTimeStart === 0
    );
  }, [
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStatins,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    departStations
  ]);
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
          className={classnames("item", {
            "item-on": isFiltersVisible || !noChecked
          })}
        >
          <i className="icon">{noChecked ? "\uf0f7" : "\uf446"}</i>
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
