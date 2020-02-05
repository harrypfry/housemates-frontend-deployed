import React from "react";

import { Header, Button } from "semantic-ui-react";

const UserInfo = props => {
  const { authUser } = props;

  const signOutUser = e => {
    props.toggleUserPortal();
    props.firebase.doSignOut().catch(console.log);

    e.preventDefault();
  };

  return (
    <div className="user-info-container">
      {authUser && (
        <>
          <Header>
            {authUser.email.substring(0, authUser.email.lastIndexOf("@"))}
          </Header>
          <img
            className="user-avatar"
            src={authUser.photoURL}
            alt="user-avatar"
          />
          <br />
        </>
      )}
      <Button onClick={signOutUser}>Sign Out</Button>
    </div>
  );
};

export default UserInfo;
