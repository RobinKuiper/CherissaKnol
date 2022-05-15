import { getSession } from 'next-auth/react';

const protect = async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    res.send({
      content: 'Protected content!'
    })
  } else {
    res.send({
      error: "Not authorized"
    })
  }
}

export default protect;