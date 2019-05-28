import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import '../css/Table.css';
// import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
 
 
class BSTable extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.data}>
          <TableHeaderColumn isKey dataField='status'>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField='timestart'>
            Start
          </TableHeaderColumn>
          <TableHeaderColumn dataField='endtime'>
            End
          </TableHeaderColumn>
          <TableHeaderColumn dataField='location'>
            Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField='dockname'>
            Dock
          </TableHeaderColumn>
          <TableHeaderColumn dataField='rowid'>
            RowID
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
 
export default BSTable;