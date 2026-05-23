const outputBody = document.getElementById('output');

function createPromise(promiseNumber) {
  const delay = Math.random() * 2 + 1;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ promise: `Promise ${promiseNumber}`, time: delay });
    }, delay * 1000);
  });
}

const promises = [createPromise(1), createPromise(2), createPromise(3)];

const loadingRow = document.createElement('tr');
loadingRow.id = 'loading';
const loadingCell = document.createElement('td');
loadingCell.colSpan = 2;
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
outputBody.appendChild(loadingRow);

Promise.all(promises)
  .then((results) => {
    outputBody.innerHTML = '';
    let maxTime = 0;
    
    results.forEach((result) => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const timeCell = document.createElement('td');
      
      nameCell.textContent = result.promise;
      timeCell.textContent = result.time.toFixed(3);
      
      row.appendChild(nameCell);
      row.appendChild(timeCell);
      outputBody.appendChild(row);
      
      if (result.time > maxTime) {
        maxTime = result.time;
      }
    });
    
    const totalRow = document.createElement('tr');
    const totalNameCell = document.createElement('td');
    const totalTimeCell = document.createElement('td');
    
    totalNameCell.textContent = 'Total';
    totalTimeCell.textContent = maxTime.toFixed(3);
    
    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    outputBody.appendChild(totalRow);
  })
  .catch((error) => {
    console.error('Error:', error);
  });