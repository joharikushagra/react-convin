import React, { useEffect, useState } from "react";
import "../styles/Users.css";
import { connect } from "react-redux";
import { fetchUsers } from "../redux/userActions";
import { Circles } from "react-loader-spinner";

function Users({ fetchUsers, userData }) {
  const [singleUser, setSingleUser] = useState(null);
  const [currentCount, setCurrentCount] = useState(0);

  const userPerPage = 4;

  const handleClick = async (e) => {
    const userId = e.target.id;
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    const userRecord = await response.json();
    setSingleUser(userRecord.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return userData.loading ? (
    <div className="container">
      <Circles />
    </div>
  ) : (
    <div className="container">
      {singleUser ? (
        <div className="usercard">
          <div className="username">
            <h1>
              {singleUser.first_name} {singleUser.last_name}
            </h1>
          </div>
          <div className="userinfo">
            <h1>Email</h1>
            <span>{singleUser.email}</span>
          </div>
        </div>
      ) : (
        <div className="placeholder-card">
          <h4>Click below buttons to view user</h4>
        </div>
      )}
      {/* BUTTONS FOR SINGLE USER DATA*/}
      <div className="btn-wrapper">
        <div className="prev-btn">
          <button
            disabled={currentCount === 0}
            onClick={() => {
              setCurrentCount((prevState) => {
                return prevState - 1 < 0 ? 0 : prevState - 1;
              });
            }}
          >
            Previous
          </button>
        </div>
        {userData.users.length &&
          userData.users
            .slice(currentCount, currentCount + userPerPage)
            .map((user) => (
              <button
                className="btn"
                id={user.id}
                key={user.id}
                onClick={handleClick}
              >
                {user.id}
              </button>
            ))}
        <div className="next-btn">
          <button
            onClick={() => {
              setCurrentCount((prevState) => {
                return prevState + 1 > userData.users.length
                  ? userData.users.length
                  : prevState + 1;
              });
            }}
            disabled={currentCount === userData.users.length - userPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    userData: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
