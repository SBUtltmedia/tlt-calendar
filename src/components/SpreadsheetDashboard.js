import React, { Component, PropTypes } from 'react'
import styles from './SpreadsheetDashboard.scss'
import json2csv from 'json2csv'
import csv2json from 'neat-csv'
import fileDownload from 'react-file-download'
import { save } from '../utils/api'
import * as _ from 'lodash'
import { connect } from 'react-redux'

class SpreadsheetDashboard extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    downloadFile: PropTypes.string.isRequired,
    mapStateToData: PropTypes.func.isRequired,
    receiveAction: PropTypes.func.isRequired
  }

  download() {
    const {data, downloadFilename} = this.props
    fileDownload(json2csv({data}), downloadFile)
  }

  upload(event) {
    const {endpoint, receiveAction} = this.props
    const reader = new FileReader()
    const files = event.target.files
    if (files.length > 0) {
      reader.readAsText(files[0])
      reader.addEventListener('load', () => {
        const csv = reader.result
        csv2json(csv).then(json => {
          save(endpoint, json)
          receiveAction(json)  // update Redux store
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
  (state, ownProps) => ({
    data: ownProps.mapStateToData(state)
  }),
	(dispatch, ownProps) => ({
    receiveAction: json => dispatch(ownProps.receiveAction(json))
  })
)(SpreadsheetDashboard)
