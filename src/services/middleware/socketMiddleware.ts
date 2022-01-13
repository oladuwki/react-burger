import { RootState } from '../store';
import { Middleware } from 'redux';
import { getAccessTokenLiteral } from '../../utils/cookie';
import { TwsActions } from "../actions/wsActions";

export const socketMiddleware = (wsActions: TwsActions): Middleware<{}, RootState> => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { payload } = action;

      const {
        openConnection,
        onOpen,
        onError,
        onGotOrders,
        onClose,
        sendMessage,
        closeConnection,
      } = wsActions;

      if (type === openConnection) {
        socket = new WebSocket(action.url);
      }

      if (socket && type === closeConnection) {
        socket.close();
        socket = null;
      }

      if (socket) {

        socket.onopen = () => {
          dispatch({ type: onOpen });
        }

        socket.onerror = (event) => {
          dispatch({ type: onError });
        }

        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);

          dispatch({
            type: onGotOrders,
            ordersData: parseData,
          });
        }

        socket.onclose = () => {
          dispatch({ type: onClose });
        }
      }

      if (socket && type === sendMessage) {
        socket.send(JSON.stringify({
          ...payload,
          token: getAccessTokenLiteral(),
        }));
      }

      next(action);
    };
  };
};
