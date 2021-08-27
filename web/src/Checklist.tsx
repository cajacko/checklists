import React from "react";
import Typography from "@material-ui/core/Typography";

function Checklist(props: { orgId: string; checklistId: string }) {
  return (
    <Typography>
      Checklist for: {props.orgId}, {props.checklistId}
    </Typography>
  );
}

export default Checklist;
