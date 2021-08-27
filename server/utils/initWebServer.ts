import express from "express";
import cors from "cors";
import { join } from "path";
import publicDir from "../config/publicDir";
import { ROUTES } from "../shared/types/Checklist";

function errorResponse(
  response: express.Response,
  status: number,
  message: string
) {
  response.status(status).json({
    message,
    error: true,
  });
}

function organisationRoute(response: express.Response, orgId: string) {
  // Look up orgId for response
  response.status(200).sendFile(join(publicDir, "index.html"));
}

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.static(publicDir));

app.get("/", async (_, response) => {
  response.status(200).sendFile(join(publicDir, "index.html"));
});

app.get("/checklist/:orgId", async (request, response) => {
  organisationRoute(response, request.params.orgId);
});

app.get("/checklist/:orgId/", async (request, response) => {
  organisationRoute(response, request.params.orgId);
});

app.post("/checklist/:orgId/get", async (request, response) => {
  response.status(200).json({
    function: ROUTES.FUNCTIONS_CHECKLISTS_GET,
    orgId: request.params.orgId,
  });
});

app.get("/checklist/:orgId/:checklistId", async (request, response) => {
  response.status(200).sendFile(join(publicDir, "index.html"));
});

app.get("/checklist/:orgId/:checklistId/", async (request, response) => {
  response.status(200).sendFile(join(publicDir, "index.html"));
});

app.post("/checklist/:orgId/:checklistId/get", async (request, response) => {
  response.status(200).json({
    function: ROUTES.FUNCTIONS_CHECKLIST_GET,
    orgId: request.params.orgId,
    checklistId: request.params.checklistId,
  });
});

app.post("/checklist/:orgId/:checklistId/set", async (request, response) => {
  response.status(200).json({
    function: ROUTES.FUNCTIONS_CHECKLIST_SET,
    orgId: request.params.orgId,
    checklistId: request.params.checklistId,
  });
});

app.post("/checklist/:orgId/:checklistId/delete", async (request, response) => {
  response.status(200).json({
    function: ROUTES.FUNCTIONS_CHECKLIST_DELETE,
    orgId: request.params.orgId,
    checklistId: request.params.checklistId,
  });
});

app.post(
  "/checklist/:orgId/:checklistId/*/item/:itemId/clear-value",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEM_CLEAR_VALUE,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      // @ts-ignore
      checklistItemsPath: request.params[0],
      itemId: request.params.itemId,
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/item/:itemId/clear-value",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEM_CLEAR_VALUE,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      checklistItemsPath: "/",
      itemId: request.params.itemId,
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/*/item/:itemId/set-value",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEM_SET_VALUE,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      // @ts-ignore
      checklistItemsPath: request.params[0],
      itemId: request.params.itemId,
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/item/:itemId/set-value",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEM_SET_VALUE,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      checklistItemsPath: "/",
      itemId: request.params.itemId,
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/*/items/set-value",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEMS_SET_VALUE,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      // @ts-ignore
      checklistItemsPath: request.params[0],
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/items/set-value",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEMS_SET_VALUE,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      checklistItemsPath: "/",
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/*/items/clear-value",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEMS_CLEAR_VALUE,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      // @ts-ignore
      checklistItemsPath: request.params[0],
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/items/clear-value",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEMS_CLEAR_VALUE,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      checklistItemsPath: "/",
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/*/items/status",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEMS_STATUS,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      // @ts-ignore
      checklistItemsPath: request.params[0],
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/items/status",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEMS_STATUS,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      checklistItemsPath: "/",
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/*/items/get",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEMS_GET,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      // @ts-ignore
      checklistItemsPath: request.params[0],
    });
  }
);

app.post(
  "/checklist/:orgId/:checklistId/items/get",
  async (request, response) => {
    response.status(200).json({
      function: ROUTES.FUNCTIONS_CHECKLIST_ITEMS_GET,
      orgId: request.params.orgId,
      checklistId: request.params.checklistId,
      checklistItemsPath: "/",
    });
  }
);

app.get("/checklist/:orgId/:checklistId/*/items", async (request, response) => {
  response.status(200).sendFile(join(publicDir, "index.html"));
});

app.get("/checklist/:orgId/:checklistId/items", async (request, response) => {
  response.status(200).sendFile(join(publicDir, "index.html"));
});

app.get(
  "/checklist/:orgId/:checklistId/*/items/",
  async (request, response) => {
    response.status(200).sendFile(join(publicDir, "index.html"));
  }
);

app.get("/checklist/:orgId/:checklistId/items/", async (request, response) => {
  response.status(200).sendFile(join(publicDir, "index.html"));
});

app.all("*", async (_, response) => {
  response.status(404).sendFile(join(publicDir, "index.html"));
});

const server = app
  .listen(process.env.PORT || 8080, () => {
    const address = server.address();

    if (!address || typeof address === "string") return;

    console.log(`Listening at http://${address.address}:${address.port}`);
  })
  .on("error", function (e) {
    console.error(e);
  });
