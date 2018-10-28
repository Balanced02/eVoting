import React from "react";

import { CardHeader, Table, Card, CardBody } from "reactstrap";

export default ({ data, select }) => {
  return (
    <div className="container-fluid">
      <Card>
        <CardHeader>Category List</CardHeader>
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
              No Category Found
            </h4>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category name</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {data.searchResults.map((category, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {category.categoryName} </td>
                    <td>
                      {" "}
                      <i
                        className="fa fa-pencil-square-o"
                        onClick={() => select(category)}
                        style={{ cursor: "pointer" }}
                      />{" "}
                    </td>
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
