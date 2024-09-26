export const apiUrls = {
    env: '/api/env/',

    currentstate: {
        get: '/api/currentstate',
        getAll: '/api/currentstate/getAll',
        set: '/api/currentstate/store',
    },

    reports: {
        add: '/api/reports/add',
        search: '/api/reports',
    },

    statistic: {
        metrics: '/api/statistic/metrics',
        slices: '/api/statistic/slices',
    },

    filter: '/api/statistic/filter',

    reportConfig: '/api/report-config',
}

export default apiUrls;
