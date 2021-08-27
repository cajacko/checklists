import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import { useHistory } from "react-router-dom";

function Checklists(props: { orgId: string }) {
  const { orgId } = props;
  const history = useHistory();
  const [newChecklistValue, setNewChecklistValue] = React.useState("");
  const isDisabled = newChecklistValue === "";

  const handleChangeNewChecklistValue = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    let value = event.target.value;

    value = value.replace(/ /gm, "-").toLowerCase();

    setNewChecklistValue(value);
  }, []);

  const handleSubmit = React.useCallback<React.FormEventHandler>(
    (event) => {
      event.preventDefault();

      if (isDisabled) return;

      setNewChecklistValue("");
      history.push(`/checklist/${orgId}/${newChecklistValue}`);
    },
    [newChecklistValue, history, orgId]
  );

  return (
    <>
      <Typography>Checklists for {props.orgId}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={newChecklistValue}
          onChange={handleChangeNewChecklistValue}
        />
        <Button onClick={handleSubmit} disabled={isDisabled}>
          Create new checklist
        </Button>
      </form>
    </>
  );
}

export default Checklists;
