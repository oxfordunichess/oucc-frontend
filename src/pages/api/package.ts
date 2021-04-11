import { NextApiHandler, NextApiRequest } from "next";

const Package = require('../../../package.json'); 

const handler: NextApiHandler = async (req, res) => {
	res.status(200).send(`${Package.name} v${Package.version}`);
}