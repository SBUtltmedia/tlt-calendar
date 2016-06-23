import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-root/dist/styles/ag-grid.css';
import 'ag-grid-root/dist/styles/theme-fresh.css';
import styles from './AdminDashboard.scss';
import ColDefFactory from '../components/admin/ColDefFactory';
import RowDataFactory from '../components/admin/RowDataFactory';

const icons = {
  columnRemoveFromGroup: '<i class="fa fa-remove"/>',
  filter: '<i class="fa fa-filter"/>',
  sortAscending: '<i class="fa fa-long-arrow-down"/>',
  sortDescending: '<i class="fa fa-long-arrow-up"/>',
  groupExpanded: '<i class="fa fa-minus-square-o"/>',
  groupContracted: '<i class="fa fa-plus-square-o"/>',
  columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
  columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
};

const columnDefs = new ColDefFactory().createColDefs();
const rowData = new RowDataFactory().createRowData();

export default () => (
  <div className={`${styles.container} ag-fresh`}>
    <AgGridReact

        // binding to properties within React State or Props
        showToolPanel={false}
        icons={icons}

        // column definitions and row data are immutable, the grid
        // will update when these lists change
        columnDefs={columnDefs}
        rowData={rowData}

        // or provide props the old way with no binding
        rowSelection="multiple"
        enableSorting="true"
        enableFilter="true"
        rowHeight="22"
    />
  </div>
);
