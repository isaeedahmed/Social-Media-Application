import React, { useState, useEffect  } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { changepass } from "./user-apis";
import Grid from "@material-ui/core/Grid";
import auth from "./../login/auth-helper";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.protectedTitle,
    // [theme.breakpoints.down('sm')]: {
   
    //   fontsize: "normal",
    
      
    // },
  },
  error: {
    verticalAlign: "middle",
  },
  submit: {
    marginBottom: theme.spacing(2),
    marginTop: "1rem",
    margin: theme.spacing(44),
  },
  rootss:{
    position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",

    [theme.breakpoints.down('sm')]: {
   
      position: "absolute",
      left: "32%",
      top: "50%",
    
      
    },
  },
  submitsssss:{
    borderRadius:"23px",
    backgroundColor:"#2676E1",
    [theme.breakpoints.down('sm')]: {
      fontsize: "12px",
    },

  }
}));

export default function ChangePassword({history}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    old_password: "",
    password: "",
    confirmpassword: "",
  });
  const [passPage, setPassPage] = useState(false);


  const clickSubmit = () => {
    let user = {
      old_password: values.old_password,
      password: values.password,
    };

    if (values.password !== values.confirmpassword) {
      alert("password don't match");
    } else {
      changepass(user);
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  useEffect(() => {
    setPassPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setPassPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div
      className={classes.rootss}
      // style={{
      //   position: "absolute",
      //   left: "50%",
      //   top: "50%",
      //   transform: "translate(-50%, -50%)",
      // }}
    >
     
          {!passPage && (
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <p>You need to login to change your password!!! </p>
            </Grid>
          </Grid>
        </div>
      )}
        {passPage && (
       <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
       
        <Grid item xs={10}>
          <Typography variant="h4" className={classes.title}>
            Change Password
          </Typography>
          <br />
          <label>
            Old Password
            <br />
            <input
              type="password"
              name="oldpassword"
              value={values.old_password}
              onChange={handleChange("old_password")}
              style={{
                backgroundColor: "#7F8287",
                border: "none",
                boxShadow: "0px 3px 6px #00000029",
              }}
            />
          </label>
          <br />
          <label>
            New Password <br />
            <input
              id="new password"
              type="password"
              margin="normal"
              name="password"
              value={values.newpassword}
              onChange={handleChange("password")}
              style={{
                backgroundColor: "#7F8287",
                border: "none",
                boxShadow: "0px 3px 6px #00000029",
              }}
            />
          </label>
          <br />
          <label>
            Confirm New Password
            <br />
            <input
              id="confirm password"
              type="password"
              margin="normal"
              name="confirmpassword"
              value={values.confirmpassword}
              onChange={handleChange("confirmpassword")}
              style={{
                backgroundColor: "#7F8287",
                border: "none",
                boxShadow: "0px 3px 6px #00000029",
              }}
            />
          </label>
          <br />
          <Button
            color="primary"
            variant="contained"
            className={classes.submitsssss}
            onClick={clickSubmit}
            // style={{
            //   borderRadius:"23px",
            //   backgroundColor:"#2676E1"
            // }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      )}
    </div>
  );
}
