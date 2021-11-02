import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import Highlight from "../components/highlight";
import { useAuth0 } from "@auth0/auth0-react";
import { justAnAlert, addHistory, clearHistory, toggleShowLog, setSessionUser } from "../utils";
import { FaceRounded } from '@material-ui/icons';
import { ArenguForm } from "react-arengu-forms"

const ArenguStartForm = (props) => (
  <div>
    <ArenguForm id="163582980230291853" />
  </div>
)

export default ArenguStartForm