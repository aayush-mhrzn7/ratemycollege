import { openPeeps } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import Image from "next/image";
import { useMemo } from "react";

function Avatar() {
  const avatar = useMemo(() => {
    const seed = Math.random().toString(36).substring(2);
    return createAvatar(openPeeps, {
      size: 70,
      seed: seed,
    }).toDataUri();
  }, []);

  return (
    <Image
      width={200}
      height={200}
      src={avatar}
      alt="Avatar"
      className="bg-white size-13 cursor-pointer rounded-full border border-border"
    />
  );
}

export default Avatar;
