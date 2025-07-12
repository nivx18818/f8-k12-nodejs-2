const { Queue } = require("@/models");

exports.getAll = async () => {
  const jobs = await Queue.findAll();
  return jobs;
};

exports.getByStatus = async (status) => {
  const job = await Queue.findAll({ where: { status } });
  return job;
};

exports.getById = async (id) => {
  const job = await Queue.findOne({ where: { id } });
  return job;
};

exports.create = async (data) => {
  const newJob = await Queue.create(data);
  return newJob;
};

exports.update = async (id, data) => {
  const updatedRows = await Queue.update(data, {
    where: { id },
  });

  if (!updatedRows) return null;

  const updatedQueue = await this.getById(id);
  return updatedQueue;
};

exports.delete = async (id) => {
  const deletedRows = await Queue.destroy({ where: { id } });
  return deletedRows > 0;
};

exports.dispatch = async (type, payload) => {
  await this.create({
    type,
    payload: JSON.stringify(payload),
  });
};
