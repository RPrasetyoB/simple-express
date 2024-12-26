export const loggedUser = (decodedToken: UserType | null) => {
  return {
    user_id: decodedToken?.id,
    full_name: decodedToken?.full_name,
  };
};
