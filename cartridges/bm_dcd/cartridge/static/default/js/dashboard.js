;(() => {
  window.DASHBOARD = {
    table: null,
    config: {
      fixedColumns: true,
      perPage: 25,
      perPageSelect: [25, 50, 100, 250, 500, 1000],
      layout: {
        top: '{search}{select}',
        bottom: '{info}{pager}',
      },
      labels: {
        placeholder: 'Filter Results ...',
        perPage: 'SHOW: {select}',
      },
    },
    checkResults() {
      // Check if we had results and decide if we need to hide the export button
      if (DASHBOARD.table.hasRows) {
        DASHBOARD.elm.exportButtons.classList.remove('hidden')
      } else {
        DASHBOARD.elm.exportButtons.classList.add('hidden')
      }
    },
    elm: {
      // Main UI
      exportButtons: document.getElementById('export-buttons'),
      exportCSV: document.getElementById('export-csv'),
      loading: document.getElementById('loading-dashboard'),
      table: document.getElementById('dcd-dashboard'),
      welcome: document.getElementById('welcome-dashboard'),
    },
    init() {
      // If we've done a Search, let's initialize the Data Tables
      if (
        typeof simpleDataTables !== 'undefined' &&
        typeof DASHBOARD_SETTINGS !== 'undefined' &&
        DASHBOARD_SETTINGS.search
      ) {
        // Convert HTML Table to Data Table
        DASHBOARD.table = new simpleDataTables.DataTable('table#dcd-dashboard', DASHBOARD.config)

        // Listen for completion of data table rendering and update UI
        DASHBOARD.table.on('datatable.init', () => {
          DASHBOARD.elm.table.classList.remove('hidden')
          DASHBOARD.elm.exportButtons.classList.remove('hidden')
          DASHBOARD.checkResults()
        })

        // Listen for Table Filtering
        DASHBOARD.table.on('datatable.search', DASHBOARD.checkResults)

        // Listen for Export Button Press
        DASHBOARD.elm.exportCSV.addEventListener('click', () => {
          // Generate CSV File for Download of Visible Rows
          DASHBOARD.table.export({
            columnDelimiter: ';',
            download: true,
            filename: 'dcd-dashboard',
            lineDelimiter: '\n',
            selection: DASHBOARD.table.currentPage,
            type: 'csv',
          })
        })
      }
    },
    filter(column, values) {
      // Need to recreate data table to filter properly
      DASHBOARD.table.destroy()
      DASHBOARD.table = new simpleDataTables.DataTable('table#dcd-dashboard', DASHBOARD.config)
      DASHBOARD.table.columns().filter(column, 'asc', false, values)
      DASHBOARD.checkResults()
    },
  }

  /**
   * Initialize on Page Load
   */
  window.addEventListener('load', DASHBOARD.init)
})(window)
