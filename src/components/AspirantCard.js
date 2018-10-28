import React from "react";

import {
  CardHeader,
  Table,
  Card,
  CardBody,
  Col,
  CardImg,
  Button
} from "reactstrap";
import moment from "moment";

export default ({ data, select, candidateName }) => {
  return (
    <Col md={6} style={{ marginBottom: 20 }}>
      <Card>
        <CardHeader style={{ fontSize: 20, textAlign: "center" }}>
          {" "}
          <strong>
            {" "}
            {`${data.partyName}`}
          </strong>{" "}
        </CardHeader>
        <CardBody>
          <img
            alt="logo"
            src={data.passport}
            className="thumbnail image"
            style={{ width: "auto", height: 150, float: "left" }}
          />
          <div style={{ float: "right" }}>
            <h4>
              {" "}
              {
                data.fullName
              }{" "}
            </h4>
            <p>
              {" "}
              <strong> DOB: </strong> {moment(data.dob).format("MMM YYYY")}{" "}
            </p>
          </div>
        </CardBody>
        <Button
          outline={!data.vote}
          color="success"
          style={{ fontSize: 15 }}
          block
          onClick={() => select(data)}
        >
          {" "}
          Vote{" "}
        </Button>
      </Card>
    </Col>
  );
};
