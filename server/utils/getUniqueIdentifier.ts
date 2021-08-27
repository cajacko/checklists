import { v4 as uuid } from "uuid";

function getUniqueIdentifier() {
  return `${new Date().valueOf()}-${uuid()}`;
}

export default getUniqueIdentifier;
