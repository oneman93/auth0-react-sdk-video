import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const RefreshLinkedAccounts = (props) => {
  const { loginWithRedirect } = useAuth0();
  const addHistory = (items) => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: preValues.history.concat(items)}
    })
  }

  return (
    <table className="table table-striped table-hover accounts">
              <thead>
                <tr>
                  <th>connection</th>
                  <th>isSocial</th>
                  <th>provider</th>
                  <th>user_id</th>
                  <th>profileData</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
  );
};

export default RefreshLinkedAccounts;