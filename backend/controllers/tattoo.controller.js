import { tattooModel } from "../models/tattoo.model.js";

const readTattoos = async (req, res) => {
  const tattoos = await tattooModel.getTattoos();
  res.json(tattoos);
};

const readTattoo = async (req, res) => {
  const { id } = req.params;
  const tattoo = await tattooModel.getTattoo(id.toLowerCase());
  if (!tattoo) {
    return res.status(404).json({ message: "Tattoo not found" });
  }
  res.json(tattoo);
};

export const tattooController = {
  readTattoos,
  readTattoo,
};
