export default (user) => {
  const modifiedUser = { ...user };
  const exclude = [
    "__v",
    "password",
    "passwordUpdatedAt",
    "isActive",
    "confirmationCode",
    "deactiveate",
  ];

  exclude.forEach((prop) => {
    delete modifiedUser[prop];
  });

  return modifiedUser;
};
