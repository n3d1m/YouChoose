const initialState = { auth: null };

function rootReducer(uploadVal, action, state = initialState) {
  switch (action) {
    case "HANDLE_AUTH":
      const authData = {
        access_token: uploadVal["access_token"],
        email: uploadVal["email"],
        full_name: uploadVal["full_name"],
      };
      state["auth"] = authData;
      return {
        ok: true,
      };

    case "GET_AUTH":
      const payload = state["auth"];
      return {
        payload,
      };
  }
}

export default rootReducer;
