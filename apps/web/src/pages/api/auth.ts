import { NextApiRequest, NextApiResponse } from "next"

import { supabase } from "../../utils/supabase"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { event, session } = req.body
  if (
    (event === "SIGNED_IN" && session.user.email.endsWith("@kmitl.ac.th")) ||
    event === "SIGNED_OUT"
  ) {
    supabase.auth.api.setAuthCookie(req, res)
  }
}

export default handler
