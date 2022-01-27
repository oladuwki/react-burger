import { useEffect } from "react";
import { useAppDispatch } from '../services/hooks';
import { confirmAuthThunk } from '../services/actions/userActions';
import { wsActions } from '../services/actions/wsActions';
import styles from './profile.module.css';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { getAccessTokenLiteral } from '../utils/cookie';
import { wsOrders } from '../utils/api-url';
import { ScrollableList } from '../components/scrollable-list/scrollable-list';

export function ProfileOrdersPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(confirmAuthThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: wsActions.openConnection,
      url: wsOrders + `?token=${getAccessTokenLiteral()}`,     
    });
    return () => {
      dispatch({ type: wsActions.closeConnection });
    };
  }, [dispatch]);

  return (
    <section className={styles.wrap}>
      <ProfileMenu activeTab={'orderHistory'} />
      <div className={styles.profileInfo + " profile-inputs"}>

        <ScrollableList isPersonal={true} />

      </div>
    </section>
  );
}