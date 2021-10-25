import React, { useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCountRenders } from "./useCountRenders";

export const Hello = React.memo(({ increment }) => {
  
  // useCountRenders();
  return <Button onClick={() => increment(5) }>hello</Button>
});

export default Hello;