import * as React from "react";
import { useNavigate } from "react-router-dom";
import { persistor } from "index";

const Logout = () => {
  const navigate = useNavigate()

  React.useEffect(() => {

    const logout = async () => {
      await persistor.purge()
      .then(() => {
        navigate("/dashboard", { 
          replace: true, 
          state: { 
            msg: "로그아웃되었습니다.", 
            variant: "success" 
          } 
        })
      })
    }

    logout()
  }, [])
}

export default Logout
