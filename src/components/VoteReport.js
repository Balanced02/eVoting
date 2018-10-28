import React from "react";
import { Table } from "reactstrap";

export default ({ data, select, categories }) => {
  return (
    <Table responsive bordered striped hover size="md" style={{ fontSize: 15 }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Surname</th>
          <th>Other Names</th>
          <th>Post</th>
          <th>Number of Votes</th>
        </tr>
      </thead>
      <tbody>
        {data.map((dat, i) => (
          <tr>
            <th scope="row">{i + 1}</th>
            <td>{dat.surName}</td>
            <td>{dat.firstName + " " + dat.otherNames}</td>
            <td>
              {categories.filter(cat => cat._id === dat.post)[0].categoryName}
            </td>
            <td>{dat.voteCount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
