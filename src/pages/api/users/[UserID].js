import Client from '../../../models/Clients';
import dbConnect from '../../../services/db';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const { ClientID } = req.query;

  switch (method) {
    case 'GET':
      try {
        const clients = await Client.find({});
        res.status(200).json({ success: true, data: clients });
        console.log('data', data);
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err });
      }
      break;
  }
}
