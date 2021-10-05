import React from "react";

//import logo from "../assets/logo.svg";
import logo from "../assets/jnj150.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from "react-bootstrap";

const EventLog = (props) => {
  const { isAuthenticated, user } = useAuth0()
  const msgAuthenticated = 'User is authenticated. useAuth0().isAuthenticated = ' + isAuthenticated;
  const msgUnAuthenticated = 'User is not authenticated yet. useAuth0().isAuthenticated = ' + isAuthenticated;

  const addHistory = (items) => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: preValues.history.concat(items)}
    })
  }

  const clearHistory = () => {
    props.setAllValues(preValues => {
      return {...preValues, ['history']: ['App started ...']}
    })
  }

  const refreshAuthentication = () => {   
    if (isAuthenticated) {
      if (!props.allValues.history.includes(msgAuthenticated)) {        
        addHistory([msgAuthenticated]);        
      }          
    } else {
      if (!props.allValues.history.includes(msgUnAuthenticated)) {        
        addHistory([msgUnAuthenticated]);        
      }      
    }    
  }

  const historyDiv = props.allValues.history.map((item, index) => {
    return (<li key={index}>{item}</li>)
  })

  return (
    <div className="event-log">
      <ButtonGroup>
      <Button
        onClick={() => {        
            refreshAuthentication();           
        }}
        id="qsRefreshAuthenticationBtn"
        variant="warning"
        className="btn-sm"
      >
        Auth Info
      </Button>    
      <Button
        onClick={() => {        
            clearHistory();           
        }}
        id="qsClearHistoryBtn"
        variant="warning"
        className="btn-sm"
      >
        Clear
      </Button>
      </ButtonGroup>

      {historyDiv}
    </div>
  )
};

export default EventLog;
