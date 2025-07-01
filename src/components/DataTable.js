/*
    A custom DataTable component that uses the DataReader to obtain the data needed
    for the ExoPlanet table, and currently displays the first 2 rows in a simple format.
    This will be expanded to include more rows once the table is fully functional.
*/

// Importing React and necessary hooks

import React, { useState, useEffect } from 'react';

// Importing Custom Components

import DataReader from './DataReader';

// Importing SCSS for styling

import '../assets/styles/TableData.scss';

const DataTable = () => 
{
    // Creating state variables to hold the data fetched from the CSV file

    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);

    // Using useEffect to fetch the data when the component mounts

    useEffect(() => 
    {
        DataReader('./data/30-06-25.csv').then(fetchedData => 
        {   
            setHeaders(fetchedData.headers);
            setData(fetchedData.dataObjects);
        })
    }, []);

    // Rendering the data in a simple format, displaying only the first 10 rows for testing

    return (
        <div className = "table-container">
            <table className="data-table">
                <thead>
                    <tr className = "header-row">
                        {
                            headers.map((header, index) => (
                                <th className = "header-cell" key = {index}> {header} </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.slice(0, 20).map((row, index) =>
                        (
                            <tr className = "data-row" key = {index}>
                                {
                                    Object.entries(row).map(([key, value]) => 
                                    (
                                        <td className = 'data-cell' key = {key}> 
                                            {value} 
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;


