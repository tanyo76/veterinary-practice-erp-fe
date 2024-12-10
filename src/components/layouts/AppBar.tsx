import { AppBar, Box, Button, Toolbar } from "@mui/material";

const AppBarComponent = (props: any) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#113861" }}>
      <Toolbar
        sx={{
          dispaly: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>{props.email}</Box>
        <Button onClick={props.logoutHandler} variant="contained">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
