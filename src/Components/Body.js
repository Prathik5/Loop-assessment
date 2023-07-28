import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Data from "../Assets/Files/dataset_small.csv";
import DataTable from "react-data-table-component";
import Multiselect from "multiselect-react-dropdown";

const Body = () => {
  const [csvData, setCSVData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [numberSelect, setNumberSelect] = useState([]);
  const [mod3Select, setmod3Select] = useState([]);
  const [mod4Select, setmod4Select] = useState([]);
  const [mod5Select, setmod5Select] = useState([]);
  const [mod6Select, setmod6Select] = useState([]);

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
    const filteredData = csvData.filter((row) => {
      return (
        (!numberSelect.length || numberSelect.includes(row.number)) &&
        (!mod3Select.length || mod3Select.includes(row.mod3)) &&
        (!mod4Select.length || mod4Select.includes(row.mod4)) &&
        (!mod5Select.length || mod5Select.includes(row.mod5)) &&
        (!mod6Select.length || mod6Select.includes(row.mod6)) &&
        (!searchText || row.number.toString().includes(searchText))
      );
    });
    setFilteredData(filteredData);
  }, [
    numberSelect,
    mod3Select,
    mod4Select,
    mod5Select,
    mod6Select,
    searchText,
    csvData,
  ]);

  useEffect(() => {
    if (numberSelect.length > 0) {
      const fullyFilteredData = csvData.filter((item) =>
        numberSelect.includes(item.number)
      );
      console.log(fullyFilteredData);
      const uniquemod3 = [
        ...new Set(fullyFilteredData.map((item) => item.mod3)),
      ];
      const uniquemod4 = [
        ...new Set(fullyFilteredData.map((item) => item.mod4)),
      ];
      const uniquemod5 = [
        ...new Set(fullyFilteredData.map((item) => item.mod5)),
      ];
      const uniquemod6 = [
        ...new Set(fullyFilteredData.map((item) => item.mod6)),
      ];

      // console.log(uniquemod3);

      setmod3Select(uniquemod3);
      setmod4Select(uniquemod4);
      setmod5Select(uniquemod5);
      setmod6Select(uniquemod6);
    } else {
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
      setmod3Select(mod3Options);
      setmod4Select(mod4Options);
      setmod5Select(mod5Options);
      setmod6Select(mod6Options);
    }
  }, [numberSelect]);

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

  const numberOptions = [...new Set(csvData.map((item) => item.number))].slice(
    0,
    -1
  );

  // const options = [
  //   numberOptions,
  //   mod3Options,
  //   mod4Options,
  //   mod5Options,
  //   mod6Options,
  // ];

  return (
    <>
      <div className="flex justify-evenly p-2 m-2">
        {/* {options.map((item) => {
          return (
            <Multiselect
              options={item}
              isObject={false}
              showArrow
              placeholder="Search"
              hidePlaceholder
              onSelect={(selectedItems) => {
                console.log(selectedItems);
              }}
            />
          );
        })} */}
        <Multiselect
          options={numberOptions}
          placeholder="Number"
          isObject={false}
          showArrow
          hidePlaceholder
          // selectedValues={numberSelect}
          onSelect={(selectedList) =>
            setNumberSelect(selectedList.map((num) => num))
          }
          onRemove={(selectedList) =>
            setNumberSelect(selectedList.map((num) => num))
          }
        />
        {/* {console.log(numberSelect)} */}
        <Multiselect
          options={mod3Select}
          placeholder="Mod3"
          isObject={false}
          showArrow
          hidePlaceholder
          onSelect={(selectedList) =>
            setmod3Select(selectedList.map((num) => num))
          }
          onRemove={(selectedList) =>
            setmod3Select(selectedList.map((num) => num))
          }
        />
        {/* {console.log(mod3Select.length)} */}
        <Multiselect
          options={mod4Select}
          placeholder="Mod4"
          isObject={false}
          showArrow
          hidePlaceholder
          onSelect={(selectedList) =>
            setmod4Select(selectedList.map((num) => num))
          }
          onRemove={(selectedList) =>
            setmod4Select(selectedList.map((num) => num))
          }
        />
        <Multiselect
          options={mod5Select}
          placeholder="Mod5"
          isObject={false}
          showArrow
          hidePlaceholder
          onSelect={(selectedList) =>
            setmod5Select(selectedList.map((num) => num))
          }
          onRemove={(selectedList) =>
            setmod5Select(selectedList.map((num) => num))
          }
        />
        <Multiselect
          options={mod6Select}
          placeholder="Mod6"
          isObject={false}
          showArrow
          hidePlaceholder
          onSelect={(selectedList) =>
            setmod6Select(selectedList.map((items) => items))
          }
          onRemove={(selectedList) =>
            setmod6Select(selectedList.map((num) => num))
          }
        />
        {/* {console.log(mod6Select)} */}
      </div>

      <div>
        <div>
          <input
            className="hover:border"
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
            highlightOnHover
            striped
            dense
          />
        </div>
      </div>
    </>
  );
};

export default Body;
