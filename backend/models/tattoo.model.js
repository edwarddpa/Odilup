import { readFile } from "node:fs/promises";

const getTattoos = async () => {
  const data = await readFile("db/tattoos.json", "utf-8");
  return JSON.parse(data);
};

const getTattoo = async (id) => {
  const tattoos = await getTattoos();
  return tattoos.find((tattoo) => tattoo.id === id);
};

export const tattooModel = {
  getTattoos,
  getTattoo,
};
