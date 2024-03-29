// react/next.js
import Image from "next/image";

// styles
import styles from "./Avatar.module.css";

const Avatar = ({ name, otherStyles }: { name: string; otherStyles: string; }) => {
  return (
      <div className={`${styles.avatar} ${otherStyles} h-9 w-9`} data-tooltip={name}>
        <Image
            alt={name}
            src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
            width={32}
            height={32}
            className={styles.avatar_picture}
        />
      </div>
  );
};

export default Avatar;
