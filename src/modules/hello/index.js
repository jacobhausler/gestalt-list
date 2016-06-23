export const get = (req, res) => res.send('Hello World!');

export const post = ({ text = 'Hello World!' }, res) => res.send(text);
