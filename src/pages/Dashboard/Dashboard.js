import React from "react";
import "./Dashboard.css";
import ListItem from "./components/ListItem/ListItem";
import List from "./components/List/List";
import { useDispatch } from "react-redux";
import { getListAction } from "../../store/actions/listActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getListAction());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <List />
      <ListItem />
    </div>
  );
};

export default Dashboard;
