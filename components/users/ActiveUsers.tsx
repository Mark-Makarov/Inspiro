// react/next.js
import { useMemo } from "react";

// utils
import {generateRandomName} from "@/lib/utils";

// hooks
import { useOthers, useSelf } from "@/liveblocks.config";

// components
import Avatar from "@/components/users/Avatar";

// styles
import styles from "@/components/users/index.module.css"

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  const memoizedUsers = useMemo(() => {
    return (
        <div className="flex items-center justify-center gap-1 py-2">
          <div className="flex pl-3">
            {currentUser && (
                <Avatar
                    name="Вы"
                    otherStyles="border-[3px] border-primary-green"
                />
            )}
            {users.slice(0, 3).map(({ connectionId}) => {
              return (
                  <Avatar
                      key={connectionId}
                      name={generateRandomName()}
                      otherStyles="-ml-3"
                  />
              );
            })}
            {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}
          </div>
        </div>
    );
  }, [users.length]);

  return memoizedUsers;
};

export default ActiveUsers;
