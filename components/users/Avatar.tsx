// styles
import styles from "./Avatar.module.css";

const Avatar = ({ src, name }: { src: string; name: string }) => {
  return (
      <div className={styles.avatar} data-tooltip={name}>
        <img
            alt="avatar"
            src={src}
            height={48}
            width={48}
            className={styles.avatar_picture}
        />
      </div>
  );
};

export default Avatar;
