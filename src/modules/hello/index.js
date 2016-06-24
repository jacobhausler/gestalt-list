// @flow

type reqType = { text: string };
type resType = { send: Function };

export const get = (req: reqType, res: resType) => res.send('Hello World!');

export const post = ({ text = 'Hello World!' }: reqType, res: resType) => res.send(text);
