/*
    A custom DataReader component that fetches a CSV file,
    processes it, and returns an array of objects representing the data.
*/

const DataReader = (file) =>
{
    // Fetch the CSV file

    return fetch(file)

    // Make sure the file exists if not throw an Error

    .then(response => 
    {
      if (!response.ok)
      {
        throw new Error(`File not Found: ${response.status}`);
      }

      return response.text();
    })

    // Read the file and split it into lines, removing the first 291 lines as they are not needed

    .then(text => 
    {
      const lines = text.split(/\r?\n/).slice(291);

      return lines
    })

    // Process the lines to convert the CSV Data into an array of objects

    .then(lines => 
    {
      // Take the first row as headers and split it by commas to get the keys

      const headers = lines[0].split(',');

      // Create a slice to get only the data rows, splitting each row by commas

      const dataRows = lines.slice(1).map(row => row.split(","));

      // Map the data rows to an array of objects, using the headers as keys

      const dataObjects = dataRows.map(row => 
      {
        return headers.reduce((obj, header, index) => 
        {
          obj[header.trim().replace(/^"(.*)"$/, '$1')] = row[index] ? row[index].trim().replace(/^"(.*)"$/, '$1') : null;

          return obj;
        }, {});
      });

      // Finally, return the output for further use

      return {headers, dataObjects};
    })

    // Catch any errors that occur during the fetch or processing

    .catch(error => 
    {
      console.error('Error reading CSV file:', error);
    })
}

export default DataReader;