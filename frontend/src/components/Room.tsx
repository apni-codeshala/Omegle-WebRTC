import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Room = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    // logic to init user to the room
  }, [name]);

  return <div>Hii, {name}</div>;
};
