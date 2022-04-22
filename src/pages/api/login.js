import login from '../../services/userADM';

export default async function handler(req, res) {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const response = await login(user.email, user.password);

  res.status(200).json(response);
}
