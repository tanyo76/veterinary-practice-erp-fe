import { Box, CircularProgress } from "@mui/material";

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;
