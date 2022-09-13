exports.checkUser = async (Model, query) => {
  const user = await Model.findOne({ ...query });
  if (!user || !user?._id) {
   let err = new Error(`Profile does not exist`);
   err.status = 404;
   throw err
  }
  return true;
};
