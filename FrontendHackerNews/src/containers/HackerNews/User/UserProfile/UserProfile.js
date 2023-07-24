import React from "react";
// import moment from "moment";
import { Table } from "semantic-ui-react";
import { connect } from "react-redux";
// import { fireDB, fireConsts } from "firebase.js";

// const timeFromNow = moment(timeOfPost).fromNow();

const UserProfile = (props) => {
  // console.log("props", props);
  const userID = props.match.params["userID"];
  let isSelf = false;

  if (props.user && props.user.username === userID) {
    isSelf = true;
    if (isSelf) {
    }
  }

  if (!props.user) {
    return null;
  } else {
    console.log("props.user", props.user);
  }

  return (
    <div>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>user:</Table.Cell>
            <Table.Cell>{userID}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>created:</Table.Cell>
            <Table.Cell>{props.user.creationDate}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>user:</Table.Cell>
            <Table.Cell>{userID}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>user:</Table.Cell>
            <Table.Cell>{userID}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.loggedInUser,
  };
};

export default connect(mapStateToProps)(UserProfile);
