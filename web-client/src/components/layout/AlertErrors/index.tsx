import React from "react";
import Alert from "@material-ui/lab/Alert";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { AlertTitle } from "@material-ui/lab";
import Grow from "@material-ui/core/Grow";

const AlertErrors = ({ errors, touched, name }) => {
  return (
    <>
      {errors && touched && (
        <Grow in={errors}>
          <Alert severity="error" style={{ marginTop: 8 }}>
            <AlertTitle>{`${name} Invalide`}</AlertTitle>
            <List style={{ padding: 0 }}>
              {errors.map((error) => (
                <ListItem style={{ padding: 0 }} key={error}>
                  - {error}
                </ListItem>
              ))}
            </List>
          </Alert>
        </Grow>
      )}
    </>
  );
};

export default AlertErrors;
