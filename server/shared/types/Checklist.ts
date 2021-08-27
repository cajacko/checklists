export enum STATUS {
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  NO_PROGRESS = "NO_PROGRESS",
}

export enum CRON_TYPE {
  ITEMS_CLEAR = "ITEMS_CLEAR",
  ITEMS_CHECK = "ITEMS_CHECK",
  ITEMS_UNCHECK = "ITEMS_UNCHECK",
}

export enum AUTOMATION_TYPE {
  CRON = "CRON",
  TIME_AFTER_LAST_ACTIVITY = "TIME_AFTER_LAST_ACTIVITY",
}

export type Automation =
  | {
      type: AUTOMATION_TYPE.CRON;
      cronType: CRON_TYPE;
      cron: string;
      dateLastStarted: string | null;
      dateLastCompleted: string | null;
    }
  | {
      type: AUTOMATION_TYPE.TIME_AFTER_LAST_ACTIVITY;
      timeoutInMs: number;
      dateLastStarted: string | null;
      dateLastCompleted: string | null;
    };

export interface Checklist {
  id: string;
  automation: Automation[];
  dateCreated: string;
  dateModified: string;
  items: Array<{
    id: string;
    label: string;
    defaultValue: boolean;
    dateCreated: string;
    dateModified: string;
  }>;
}

export interface ChecklistItems {
  id: string;
  checklistId: string;
  items: Array<{
    id: string;
    value: boolean;
    label: string;
    dateCreated: string;
    dateModified: string;
  }>;
  dateCreated: string;
  dateModified: string;
  status: STATUS;
}

export enum ROUTES {
  // Supply a path (must have the orgId) and then returns all nested checklists
  FUNCTIONS_CHECKLISTS_GET = "FUNCTIONS_CHECKLISTS_GET",

  // FUNCTIONS_CHECKLIST
  // None of these include item values, just definitions
  FUNCTIONS_CHECKLIST_DELETE = "FUNCTIONS_CHECKLIST_DELETE",
  // Can specify error http code
  FUNCTIONS_CHECKLIST_GET = "FUNCTIONS_CHECKLIST_GET",
  FUNCTIONS_CHECKLIST_SET = "FUNCTIONS_CHECKLIST_SET",

  // All setting/deleting of items is done via the checklist. You set the object each time

  // FUNCTIONS_CHECKLIST_ITEM
  FUNCTIONS_CHECKLIST_ITEM_CLEAR_VALUE = "FUNCTIONS_CHECKLIST_ITEM_CLEAR_VALUE",
  FUNCTIONS_CHECKLIST_ITEM_SET_VALUE = "FUNCTIONS_CHECKLIST_ITEM_SET_VALUE",

  // FUNCTIONS_CHECKLIST_ITEMS
  FUNCTIONS_CHECKLIST_ITEMS_GET = "FUNCTIONS_CHECKLIST_ITEMS_GET",
  FUNCTIONS_CHECKLIST_ITEMS_SET_VALUE = "FUNCTIONS_CHECKLIST_ITEMS_SET_VALUE",
  FUNCTIONS_CHECKLIST_ITEMS_CLEAR_VALUE = "FUNCTIONS_CHECKLIST_ITEMS_CLEAR_VALUE",
  // Can specify error http code
  FUNCTIONS_CHECKLIST_ITEMS_STATUS = "FUNCTIONS_CHECKLIST_ITEMS_STATUS",
  UI = "UI",
}

// export default ROUTES;

// Reserved words - set | status | delete | item | items | get | clear-value | set-value

// checklist/{orgId}/ - (ui) FUNCTIONS_CHECKLISTS_GET
// checklist/{orgId}/get - FUNCTIONS_CHECKLISTS_GET
// checklist/{orgId}/{checklistId}/ - (ui) FUNCTIONS_CHECKLIST_GET
// checklist/{orgId}/{checklistId}/get - FUNCTIONS_CHECKLIST_GET
// checklist/{orgId}/{checklistId}/set - FUNCTIONS_CHECKLIST_SET
// checklist/{orgId}/{checklistId}/delete - FUNCTIONS_CHECKLIST_DELETE
// checklist/{orgId}/{checklistId}/items - (ui) FUNCTIONS_CHECKLIST_ITEMS_GET
// checklist/{orgId}/{checklistId}/items/get - FUNCTIONS_CHECKLIST_ITEMS_GET
// checklist/{orgId}/{checklistId}/items/status - FUNCTIONS_CHECKLIST_ITEMS_STATUS
// checklist/{orgId}/{checklistId}/items/set-value - FUNCTIONS_CHECKLIST_ITEMS_SET_VALUE
// checklist/{orgId}/{checklistId}/items/clear-value - FUNCTIONS_CHECKLIST_ITEMS_CLEAR_VALUE
// checklist/{orgId}/{checklistId}/item/{itemId}/set-value - FUNCTIONS_CHECKLIST_ITEM_SET_VALUE
// checklist/{orgId}/{checklistId}/item/{itemId}/clear-value - FUNCTIONS_CHECKLIST_ITEM_CLEAR_VALUE
// checklist/{orgId}/{checklistId}/{path}/items - (ui) FUNCTIONS_CHECKLIST_ITEMS_GET
// checklist/{orgId}/{checklistId}/{path}/items/get - FUNCTIONS_CHECKLIST_ITEMS_GET
// checklist/{orgId}/{checklistId}/{path}/items/status - FUNCTIONS_CHECKLIST_ITEMS_STATUS
// checklist/{orgId}/{checklistId}/{path}/items/set-value - FUNCTIONS_CHECKLIST_ITEMS_SET_VALUE
// checklist/{orgId}/{checklistId}/{path}/items/clear-value - FUNCTIONS_CHECKLIST_ITEMS_CLEAR_VALUE
// checklist/{orgId}/{checklistId}/{path}/item/{itemId}/set-value - FUNCTIONS_CHECKLIST_ITEM_SET_VALUE
// checklist/{orgId}/{checklistId}/{path}/item/{itemId}/clear-value - FUNCTIONS_CHECKLIST_ITEM_CLEAR_VALUE

// We look up the tree to find a checklist that exists. So you can nest infinitely

// So if you set a checklist at /checklist/charlie/create-pr/set
// You can access it on:
// - /checklist/charlie/create-pr/
// - /checklist/charlie/create-pr/personal-website/
// - /checklist/charlie/create-pr/personal-website/pr-123/
// And get the status as /checklist/charlie/create-pr/personal-website/pr-123/items/status
// All the items come from /checklist/charlie/create-pr until a checklist is set further down the
// tree e.g. at /checklist/charlie/create-pr/personal-website/set
// Items checked status is also inherited e.g. checking the first item on /checklist/charlie/create-pr/
// Will have it checked on:
// - /checklist/charlie/create-pr/personal-website/
// - /checklist/charlie/create-pr/personal-website/pr-123/
