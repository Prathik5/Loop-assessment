import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Data from "../Assets/Files/dataset_small.csv";
import DataTable from "react-data-table-component";
import Multiselect from "multiselect-react-dropdown";

const Body = () => {
  const [csvData, setCSVData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
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
  useEffect(() => {
    const filteredData = csvData.filter((row) =>
      row.number.toString().includes(searchText)
    );
    setFilteredData(filteredData);
  }, [searchText, csvData]);

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

  const numberOptions = [...new Set(csvData.map((item) => item.number))].map(
    (value) => ({
      value: value,
      label: value.toString(),
    })
  );

  const mod3Options = [...new Set(csvData.map((item) => item.mod3))].slice(
    0,
    -1
  );
  const mod4Options = [...new Set(csvData.map((item) => item.mod4))].slice(
    0,
    -1
  );
  const mod5Options = [...new Set(csvData.map((item) => item.mod5))].slice(
    0,
    -1
  );
  const mod6Options = [...new Set(csvData.map((item) => item.mod6))].slice(
    0,
    -1
  );

  return (
    <>
      <div className="flex justify-evenly">
        <Multiselect
          options={numberOptions}
          placeholder="Number"
          isObject={false}
          showArrow
        />
        <Multiselect
          options={mod3Options}
          placeholder="Mod3"
          isObject={false}
          showArrow
          hidePlaceholder
        />
        <Multiselect
          options={mod4Options}
          placeholder="Mod4"
          isObject={false}
          showArrow
          hidePlaceholder
        />
        <Multiselect
          options={mod5Options}
          placeholder="Mod5"
          isObject={false}
          showArrow
          hidePlaceholder
        />
        <Multiselect
          options={mod6Options}
          placeholder="Mod6"
          isObject={false}
          showArrow
          hidePlaceholder
        />
      </div>

      <div>
        <div>
          <input
            className="bg-black text-white"
            type="text"
            placeholder="Search Number"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <DataTable
            columns={Columns}
            data={filteredData}
            pagination
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100, 150, 200]}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
