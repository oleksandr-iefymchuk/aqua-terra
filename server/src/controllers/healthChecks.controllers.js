export const healthCheck = (req, res) => {
  const response = { status: 'Server is up and running' };
  res.status(200).json(response);
};
