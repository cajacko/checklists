import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function Checklist(props: { orgId: string; checklistId: string }) {
  const { orgId } = props;
  const [newChecklistItem, setNewChecklistItem] = React.useState("");
  const isDisabled = newChecklistItem === "";

  const handleChangeNewChecklistItem = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    let value = event.target.value;

    setNewChecklistItem(value);
  }, []);

  const handleSubmit = React.useCallback<React.FormEventHandler>(
    (event) => {
      event.preventDefault();

      if (isDisabled) return;
      // history.push(`/checklist/${orgId}/${newChecklistValue}`);
    },
    [newChecklistItem, orgId, isDisabled]
  );

  return (
    <>
      <Typography>
        Checklist for: {props.orgId}, {props.checklistId}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={newChecklistItem}
          onChange={handleChangeNewChecklistItem}
        />
        <Button onClick={handleSubmit} disabled={isDisabled}>
          Create new item
        </Button>
      </form>
    </>
  );
}

export default Checklist;
