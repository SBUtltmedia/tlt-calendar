import styles from './SpreadsheetDashboard.scss';
import json2csv from 'json2csv';
import csv2json from 'neat-csv';
import fileDownload from 'react-file-download';
import { save } from '../utils/api';
import * as _ from 'lodash';

function fakeCsv() {
  const data = {a:1, b:2};
  return json2csv({
    data,
    fields: ['a', 'b']
  });
}

function rearrangeInputData(json) {
  const bySession = _.groupBy(json, 'Session')
  const byLocation = _.mapValues(bySession, s => _.groupBy(s, 'Site'))
  return _.mapValues(byLocation, s => _.mapValues(  // remove reduntant fields
    s, l => _.map(l, item => _.omit(item, ['Session', 'Site']))))
}

function upload(event) {
  const reader = new FileReader();
  const files = event.target.files;
  if (files.length > 0) {
    reader.readAsText(files[0]);
    reader.addEventListener("load", () => {
      const csv = reader.result;
      csv2json(csv).then(json => {
        save('/slots', rearrangeInputData(json));
      });
    }, false);
  }
}

export default () => (
  <div className={styles.container}>
    <button onClick={() => fileDownload(fakeCsv(), 'filename.csv')}
    className="btn btn-success">Download spreadsheet</button>

    <input onChange={upload}
    type="file" className="btn btn-success" />
  </div>
);
