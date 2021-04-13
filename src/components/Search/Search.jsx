import React, { useEffect, useState } from "react";
import "../styles.css";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@material-ui/core";
import { getUsers } from "../../store/Actions/user";
import { Dropdown } from "react-bootstrap";
import onClickOutside from "react-onclickoutside";
import "./Search.css"
import { useHistory } from "react-router";
function Search() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  Search.handleClickOutside = () => setIsOpen(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);
  useEffect(() => {
    dispatch(getUsers());
  }, [name]);
  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(name.toLowerCase()) || user.surname.toLowerCase().includes(name.toLowerCase());
  });
  const history = useHistory() 
  const redirect = (id) => {
    history.push("/profile/" + id)
    setIsOpen(false)
    setName("")
  } 
  const randomizeArray = filteredUsers.sort(() => 0.5 - Math.random())

  return (
    <div className="search">
      <div className="input-icon">
        <SearchIcon />
      </div>
      <input
        onClick={toggle}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="search-field"
        placeholder="Search..."
      />
     {isOpen ? (<Dropdown.Menu className="search-dropdown" show={isOpen} >
        <Dropdown.Header>Recent</Dropdown.Header>
        {randomizeArray ? 
        randomizeArray.map((user) => (
            <Dropdown.Item onClick={() => redirect(user._id)}><Avatar src={user.imgUrl} />
            <div className="ml-3">
            {user.name} {user.surname}
            </div>
            </Dropdown.Item>
        ))
         : null}

      </Dropdown.Menu>) : null}
    </div>
  );
}
const clickOutsideConfig = {
    handleClickOutside: () => Search.handleClickOutside,

}
export default onClickOutside(Search,clickOutsideConfig)