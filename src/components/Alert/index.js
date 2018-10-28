import React from "react";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { message } from "antd";
import { clearError, clearInfo } from "../../actions/feedback";

const AlertComponent = ({ dispatch, errors, infos }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      <div className="alertBox">
        {infos.reverse().map((info, i) => (
          <Alert
            color="info"
            key={i}
            toggle={() => dispatch(clearInfo(info.id))}
          >
            {info.info}
          </Alert>
        ))}
        {errors.reverse().map((error, i) => (
          <Alert
            color="danger"
            key={i}
            toggle={() => dispatch(clearError(error.id))}
          >
            {error.error}
          </Alert>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    errors: state.feedback.errors,
    infos: state.feedback.infos
  };
};

export default connect(mapStateToProps)(AlertComponent);
