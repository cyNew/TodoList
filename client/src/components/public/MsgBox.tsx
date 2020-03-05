import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

interface Props {
  msg: string;
}

export const MsgBox: React.FC<Props> = ({ msg }) => {
  const { error } = useContext(GlobalContext);
  const [errorMsg, setErrorMsg] = useState(msg);

  useEffect(() => {
    setErrorMsg(error!);
  }, [error]);

  useEffect(() => {
    setErrorMsg(msg);
  }, [msg]);
  return <div className="msg-box">{errorMsg}</div>;
};
