import styles from './SpreadsheetDashboard.scss';
import json2csv from 'json2csv';
import fileDownload from 'react-file-download';

function fakeCsv() {
  const data = {a:1, b:2};
  return json2csv({
    data,
    fields: ['a', 'b']
  });
}

export default () => (
  <div className={styles.container}>
    <button onClick={() => fileDownload(fakeCsv(), 'filename.csv')} className="btn btn-success">Download spreadsheet</button>
    <button className="btn btn-success">Upload spreadsheet</button>
  </div>
);
