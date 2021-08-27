import React from "react";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checklist from "./Checklist";
import ChecklistItems from "./ChecklistItems";
import Checklists from "./Checklists";
import FourOhFour from "./FourOhFour";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Typography>Home</Typography>
        </Route>
        <Route path="/:orgId">
          <Route>
            {({ match }) => (
              <Typography>Organisation: {match?.params.orgId}</Typography>
            )}
          </Route>

          <Switch>
            <Route path="/:orgId/:checklistId">
              <Route>
                {({ match }) => (
                  <Typography>
                    Checklist: {match?.params.checklistId}
                  </Typography>
                )}
              </Route>
              <Switch>
                <Route path="/:orgId/:checklistId/*/items">
                  {({ match }) =>
                    match ? (
                      <ChecklistItems
                        checklistId={match.params.checklistId}
                        orgId={match.params.orgId}
                        // @ts-ignore
                        path={match.params[0]}
                      />
                    ) : (
                      <FourOhFour />
                    )
                  }
                </Route>

                <Route path="/:orgId/:checklistId/items">
                  {({ match }) =>
                    match ? (
                      <ChecklistItems
                        checklistId={match.params.checklistId}
                        orgId={match.params.orgId}
                        path="/"
                      />
                    ) : (
                      <FourOhFour />
                    )
                  }
                </Route>

                <Route path="/:orgId/:checklistId">
                  {({ match }) =>
                    match ? (
                      <Checklist
                        checklistId={match.params.checklistId}
                        orgId={match.params.orgId}
                      />
                    ) : (
                      <FourOhFour />
                    )
                  }
                </Route>
              </Switch>
            </Route>

            <Route path="/:orgId">
              {({ match }) =>
                match ? (
                  <Checklists orgId={match.params.orgId} />
                ) : (
                  <FourOhFour />
                )
              }
            </Route>
          </Switch>
        </Route>

        <Route>
          <FourOhFour />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
