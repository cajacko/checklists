import React from "react";
import Typography from "@material-ui/core/Typography";

function ChecklistItems(props: {
  orgId: string;
  path: string;
  checklistId: string;
}) {
  return (
    <Typography>
      ChecklistItems for: {props.orgId}, {props.checklistId}, {props.path}
    </Typography>
  );
}

export default ChecklistItems;
