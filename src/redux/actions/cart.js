import Axios from "axios";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const getCartData = (userId) => {
  console.log(userId);
  return (dispatch) => {
    Axios.get(`http://localhost:5000/cart`, {
      params: {
        userId,
      },
    })
      .then((result) => {
        dispatch({
          type: "FILL_CART",
          pauload: result.data,
        });
      })
      .catch(() => {
        swal({
          title: "There is some mistake in server",
          icon: "warning",
          confirm: true,
        });
      });
  };
};

