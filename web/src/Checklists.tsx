import React from "react";
import Typography from "@material-ui/core/Typography";

function Checklists(props: { orgId: string }) {
  return <Typography>Checklists for {props.orgId}</Typography>;
}

export default Checklists;
