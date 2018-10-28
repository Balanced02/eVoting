import React from "react";
import basicStyle from "../config/basicStyle";

import { Row, Col, Card, Icon } from "antd";

export default ({ data, searching }) => {
  const { rowStyle, colStyle } = basicStyle;

  return (
    <Row style={rowStyle} gutter={3} justify="start">
      <Col span={6} md={6} sm={12} xs={24} style={colStyle}>
        <Card loading={searching} style={{ backgroundColor: "#ff4d4f" }}>
          <span
            className="fa fa-graduation-cap fa-4x"
            style={{ float: "right" }}
          />
          <h4>{data.votingSession || 0}</h4> <p> Voting Session </p>
        </Card>
      </Col>
      <Col span={6} md={6} sm={12} xs={24} style={colStyle}>
        <Card loading={searching} style={{ backgroundColor: "#52c41a" }}>
          <span
            className="fa fa-pencil-square fa-4x"
            style={{ float: "right" }}
          />
          <h4>{data.totalVoters || 0}</h4>
          <p> Total Voters </p>
        </Card>
      </Col>
      <Col span={6} md={6} sm={12} xs={24} style={colStyle}>
        <Card loading={searching} style={{ backgroundColor: "#1890ff" }}>
          <span className="fa fa-users fa-4x" style={{ float: "right" }} />
          <h4>{data.aspirants || 0}</h4>
          <p> Total Aspirants </p>
        </Card>
      </Col>
      <Col span={6} md={6} sm={12} xs={24} style={colStyle}>
        <Card loading={searching} style={{ backgroundColor: "#ffc53d" }}>
          <span className="fa fa-envelope fa-4x" style={{ float: "right" }} />
          <h4>{data.category || 0}</h4>
          <p> Voting Category </p>
        </Card>
      </Col>
    </Row>
  );
};
