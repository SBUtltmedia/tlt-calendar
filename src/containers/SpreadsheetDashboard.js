import React, { Component } from 'react'
import styles from './SpreadsheetDashboard.scss'
import json2csv from 'json2csv'
import csv2json from 'neat-csv'
import fileDownload from 'react-file-download'
import { save } from '../utils/api'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { receiveSlots } from '../actions/SlotsActions'

function generateCsv(data) {
  return json2csv({
    data,
    fields: ['Session', 'Site', 'Day', 'Start Time', 'End Time']
  })
}

class SpreadsheetDashboard extends Component {

  download() {
    const {slots} = this.props
    fileDownload(generateCsv(slots), 'slots.csv')
  }

  upload(event) {
    const {receiveSlots} = this.props
    const reader = new FileReader()
    const files = event.target.files
    if (files.length > 0) {
      reader.readAsText(files[0])
      reader.addEventListener("load", () => {
        const csv = reader.result
        csv2json(csv).then(json => {
          save('/slots', json)
          receiveSlots(json)  // update Redux store
        })
      }, false)
    }
  }

  render() {
    return (<div className={styles.container}>
      <button onClick={() => this.download()} className="btn btn-success">
        Download spreadsheet
      </button>
      <input onChange={e => this.upload(e)} type="file" className="btn btn-success" />
    </div>)
  }
}

export default connect(
  state => ({
    slots: state.slots
  }),
	{receiveSlots}
)(SpreadsheetDashboard)
