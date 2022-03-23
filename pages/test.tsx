import { useEffect, useState } from "react";

export default function Test() {
  const [obj, setObj] = useState<any>({ x: 1, z: 2 });
  useEffect(() => {
    setObj({ y: 1 });
    console.log(obj);
  }, [obj]);
  return <div>231</div>;
}
