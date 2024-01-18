import { publicRequest } from "../../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./user";

// api helper 

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    res.status == "201" && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
