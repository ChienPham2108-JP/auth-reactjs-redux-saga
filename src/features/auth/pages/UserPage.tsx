import { Button } from "@mui/material";
import { authActions } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";

interface UserPageProps {}

const UserPage = (props: UserPageProps) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const authState = selector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    dispatch(authActions.logOut(authState));
    navigate("/login");
  };

  return (
    <>
      User Dashboard
      <Button
        color="success"
        variant="contained"
        size="large"
        style={{ background: "#42b72a" }}
        onClick={handleLogOutClick}
      >
        Log Out
      </Button>
    </>
  );
};

export default UserPage;
