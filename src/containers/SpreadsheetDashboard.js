import styles from './SpreadsheetDashboard.scss';
import json2csv from 'json2csv';
import csv2json from 'neat-csv';
import fileDownload from 'react-file-download';
import { save } from '../utils/api';
import * as _ from 'lodash';
import { connect } from 'react-redux';

function generateCsv(data) {
  return json2csv({
    data,
    fields: ['Session', 'Site', 'Day', 'Start Time', 'End Time']
  });
}

function upload(event) {
  const reader = new FileReader();
  const files = event.target.files;
  if (files.length > 0) {
    reader.readAsText(files[0]);
    reader.addEventListener("load", () => {
      const csv = reader.result;
      csv2json(csv).then(json => {
        save('/slots', json);
      });
    }, false);
  }
}

const SpreadsheetDashboard = ({slots}) => (
  <div className={styles.container}>
    <button onClick={() => fileDownload(generateCsv(slots), 'slots.csv')}
    className="btn btn-success">Download spreadsheet</button>

    <input onChange={upload}
    type="file" className="btn btn-success" />
  </div>
);

export default connect(
  state => ({
    slots: state.slots
  }),
	{}
)(SpreadsheetDashboard);
