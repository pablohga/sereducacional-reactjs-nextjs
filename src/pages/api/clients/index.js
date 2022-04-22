import Client from '../../../models/Clients';
import dbConnect from '../../../services/db';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const clients = await Client.find({});
        res.status(200).json({ success: true, data: clients });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
      }
      break;

    case 'POST':
      try {
        const { name, email, password } = req.body;
        console.log(name, email, password);

        if (!name && !email && !password) throw '-invalid data';

        const client = await Client.create({ name, email, password });
        res.status(201).json({ success: true, data: client });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
      }
      break;
  }
}
