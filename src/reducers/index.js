const initialState = {
  auth: null,
  currentApi: "https://95941b29ed78.ngrok.io",
  placeData: null,
  latLong: null,
  dragHandle: null,
};

function rootReducer(uploadVal, action, state = initialState) {
  switch (action) {
    case "HANDLE_AUTH":
      const authData = {
        access_token: uploadVal["access_token"],
        email: uploadVal["email"],
        full_name: uploadVal["full_name"],
        user_id: uploadVal["user_id"],
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

    case "GET_API":
      const api = state["currentApi"];
      return { api };

    case "UPDATE_PLACE_DATA":
      state["placeData"] = uploadVal;
      return {
        ok: true,
      };

    case "GET_PLACE_DATA":
      return state["placeData"];

    case "UPDATE_LAT_LONG":
      state["latLong"] = uploadVal;
      return {
        ok: true,
      };

    case "GET_LAT_LONG":
      return state["latLong"];

    case "UPDATE_DRAG_HANDLE":
      state["dragHandle"] = uploadVal;
      return {
        ok: true,
      };

    case "GET_DRAG_HANDLE":
      return state["dragHandle"];
  }
}

export default rootReducer;
