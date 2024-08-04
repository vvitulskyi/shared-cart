import { Navigate, useParams } from "react-router-dom";

export default function Cnnection() {
  const { cartLink } = useParams();
  return <Navigate to="/" replace state={{ link: cartLink }} />;
}
