import { v4 as uuidv4 } from "uuid";

const generateId = () => `${Date.now()}-${uuidv4()}`;

export default generateId;
