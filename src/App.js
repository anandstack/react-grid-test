import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./App.css";
import {
  FixedSizeList as WindowList,
  FixedSizeGrid as WindowGrid,
} from "react-window";

function App() {
  const [appData, setAppData] = useState([]);
  const windowListRef = useRef(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [columnIndex, setColumnIndex] = useState(0);

  const sleep = (seconds) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  };

  const loadData = async () => {
    console.log("loadData is called");
    let length = appData.length;
    let array = [];

    for (let i = 1; i <= 50; ++i) {
      array.push({ name: `Name ${i}`, id: i, status: i % 7 });
    }

    let final = [];
    for (let i = 0; i < 1000; ++i) {
      final.push(array);
    }

    if (length > 0) await sleep(1);
    setAppData((appdata) => [...appData, ...final]);
  };

  useLayoutEffect(() => {
    if (appData.length < 5000) loadData();
  }, [appData]);
  //windowListRef.current.scrollToItem(e.target.value)
  return (
    <div className="App">
      <header className="App-header">
        Hello Mister <br />
        <input
          type="number"
          onChange={(e) => {
            setRowIndex(e.target.value);
          }}
        />
        <input
          type="number"
          onChange={(e) => {
            setColumnIndex(e.target.value);
          }}
        />
        <button
          onClick={() =>
            windowListRef.current.scrollToItem({ rowIndex, columnIndex })
          }
        >
          Show
        </button>{" "}
        <span>{appData && `${appData.length}`}</span>
        <br />
        {appData && (
          <WindowGrid
            ref={windowListRef}
            height={500}
            width={900}
            columnCount={500}
            columnWidth={280}
            rowCount={appData.length}
            rowHeight={35}
            useIsScrolling
          >
            {({ rowIndex, columnIndex, style, isScrolling }) => (
              <div className={!(rowIndex % 2) ? "item-odd" : ""} style={style}>
                {isScrolling ? (
                  <span style={{ fontSize: "10px" }}>Loading...</span>
                ) : (
                  <span>
                    {appData[rowIndex][columnIndex].id}.{" "}
                    {appData[rowIndex][columnIndex].name} is{" "}
                    <span
                      onClick={() =>
                        (appData[rowIndex][columnIndex].status = !appData[
                          rowIndex
                        ][columnIndex].status)
                      }
                    >
                      {appData[rowIndex][columnIndex].status
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </span>
                )}
              </div>
            )}
          </WindowGrid>
        )}
        <br />
        <div>
          {appData &&
            appData.map((array) =>
              array.map((dataObj) => (
                <div key={dataObj.id}>
                  {dataObj.id}{" "}
                  <span onClick={() => (dataObj.status = !dataObj.status)}>
                    {dataObj.status ? "Active" : "Inactive"}
                  </span>
                </div>
              ))
            )}
        </div>
      </header>
    </div>
  );
}

export default App;
