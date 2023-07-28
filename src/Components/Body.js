import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Data from "../Assets/Files/dataset_small.csv";
import DataTable from "react-data-table-component";
import Multiselect from "multiselect-react-dropdown";

const Body = () => {
  const [csvData, setCSVData] = useState([]);
  useEffect(() => {
    const parseData = async () => {
      Papa.parse(Data, {
        download: true,
        header: true,
        complete: (result) => setCSVData(result.data),
      });
    };
    parseData();
  }, []);

  console.log(csvData);
  const Columns = [
    { name: "Numbers", selector: (row) => row.number, sortable: true },
    { name: "Mod3", selector: (row) => row.mod3, sortable: true },
    { name: "Mod4", selector: (row) => row.mod4, sortable: true },
    { name: "Mod5", selector: (row) => row.mod5, sortable: true },
    { name: "Mod6", selector: (row) => row.mod6, sortable: true },
  ];

  const tableData = csvData.map((user) => {
    return {
      number: user.number,
      mod3: user.mod3,
      mod4: user.mod4,
      mod5: user.mod5,
      mod6: user.mod6,
    };
  });

  return (
    <div>
      <DataTable
        columns={Columns}
        data={tableData}
        pagination
        paginationPerPage={100}
        paginationRowsPerPageOptions={[100, 150, 200]}
      />
    </div>
  );
};

export default Body;
