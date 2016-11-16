import styles from './SpreadsheetDashboard.scss';
import json2csv from 'json2csv';
import DownloadButton from 'downloadbutton';

function fakeCsv(callback) {
  const data = {a:1, b:2};
  json2csv({
      data,
      fields: ['a', 'b']
  }, callback);
}

export default () => (
  <div className={styles.container}>
    <DownloadButton genFile={f => fakeCsv(f)} async={true} className="btn btn-success">Download spreadsheet</DownloadButton>
    <DownloadButton className="btn btn-success">Upload spreadsheet</DownloadButton>
  </div>
);
