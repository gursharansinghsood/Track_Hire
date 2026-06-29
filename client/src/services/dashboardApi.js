import { API } from './api'

const DashboardAPI = {
    getSummary: () => API.get('/dashboard/summary'),
    getCharts: () => API.get('/dashboard/charts'),
    getUpcoming: () => API.get('/dashboard/upcoming'),
}

export { DashboardAPI }

