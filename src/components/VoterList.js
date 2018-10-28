import React from "react";

import { CardHeader, Table, Card, CardBody } from "reactstrap";
import moment from "moment";

export default ({ data, select }) => {
  return (
    <div className="container-fluid">
      <Card>
        <CardHeader>Voters List</CardHeader>
        <CardBody>
          {data.searching ? (
            <i className="fa fa-spinner fa-spin fa-2x" />
          ) : !data.searchResults.length ? (
            <h4
              style={{
                textAlign: "center",
                marginTop: 20,
                alignSelf: "stretch",
                flex: 1
              }}
            >
              No Voters Registered Yet
            </h4>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Full Name</th>
                  <th>Date of Birth</th>
                  <th>State of Origin</th>
                  <th>Local Govt. Area</th>
                  <th>Restered</th>
                </tr>
              </thead>
              <tbody>
                {data.searchResults.map((dat, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {dat.sid.slice(0, 8)} </td>
                    <td>
                      {" "}
                      {dat.surName +
                        " " +
                        dat.firstName +
                        " " +
                        dat.otherNames || ""}{" "}
                    </td>
                    <td> {moment(dat.dob).format("Do MMM YYYY")} </td>
                    <td> {dat.stateOfOrigin} </td>
                    <td> {dat.localGovtArea} </td>
                    <td>{moment(dat.registered).format("Do MMM YYYY")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
