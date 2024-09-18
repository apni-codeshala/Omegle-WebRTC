import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const URL = "http://localhost:3000";

export const Room = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [socket, setSocket] = useState<null | Socket>(null);
  const [lobby, setLobby] = useState(true);

  useEffect(() => {
    const socket = io(URL, {
      autoConnect: true,
    });
    setSocket(socket);

    socket.on("send-offer", ({ roomId }) => {
      alert("send offer please");
      setLobby(false);
      socket.emit("offer", {
        sdp: "",
        roomId,
      });
    });

    socket.on("offer", ({ roomId, offer }) => {
      alert("Send answer pleasw");
      setLobby(false);
      socket.emit("ansesr", {
        sdp: "",
        roomId,
      });
    });

    socket.on("answer", ({ roomId, answer }) => {
      setLobby(false);
      alert("Connection done");
    });

    socket.on("lobby", () => {
      setLobby(true);
    });
  }, [name]);

  if (lobby) {
    return <div>Waiting to connect to someone</div>;
  }

  return (
    <div>
      Hii, {name}
      <video width={400} height={400} />
      <video width={400} height={400} />
    </div>
  );
};
