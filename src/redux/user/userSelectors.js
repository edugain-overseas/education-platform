export const getUserName = (state) => state.user.userName;
export const getUserId = (state) => state.user.userId;
export const getIsLoading = (state) => state.user.isLoading;
export const getUserInfo = (state) => state.user.info;
export const getUserGroup = (state) => state.user.info?.group_name;
export const getToken = (state) => state.user.token;
export const getUserType = (state) => state.user.userType;
