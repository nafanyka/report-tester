export default function () {
    document.getElementById('metricsWrapperBody').addEventListener('show.bs.collapse', function(){
        localStorage.setItem('metricsWrapperStatus', true);
    });
    document.getElementById('metricsWrapperBody').addEventListener('hide.bs.collapse', function(){
        localStorage.setItem('metricsWrapperStatus', false);
    });
    document.getElementById('slicesWrapperBody').addEventListener('show.bs.collapse', function(){
        localStorage.setItem('slicesWrapperStatus', true);
    });
    document.getElementById('slicesWrapperBody').addEventListener('hide.bs.collapse', function(){
        localStorage.setItem('slicesWrapperStatus', false);
    });
    document.getElementById('filtersWrapperBody').addEventListener('show.bs.collapse', function(){
        localStorage.setItem('filtersWrapperStatus', true);
    });
    document.getElementById('filtersWrapperBody').addEventListener('hide.bs.collapse', function(){
        localStorage.setItem('filtersWrapperStatus', false);
    });
    if ((localStorage.getItem('metricsWrapperStatus') ?? 'true') === 'true') {
        document.getElementById('metricsWrapperBody').classList.add('show');
        document.getElementById('metricsWrapperHeader').classList.remove('collapsed');
    } else {
        document.getElementById('metricsWrapperBody').classList.remove('show');
        document.getElementById('metricsWrapperHeader').classList.add('collapsed');
    }
    if ((localStorage.getItem('slicesWrapperStatus') ?? 'true') === 'true') {
        document.getElementById('slicesWrapperBody').classList.add('show');
        document.getElementById('slicesWrapperHeader').classList.remove('collapsed');
    } else {
        document.getElementById('slicesWrapperBody').classList.remove('show');
        document.getElementById('slicesWrapperHeader').classList.add('collapsed');
    }
    if ((localStorage.getItem('filtersWrapperStatus') ?? 'false') === 'true') {
        document.getElementById('filtersWrapperBody').classList.add('show');
        document.getElementById('filtersWrapperHeader').classList.remove('collapsed');
    } else {
        document.getElementById('filtersWrapperBody').classList.remove('show');
        document.getElementById('filtersWrapperHeader').classList.add('collapsed');
    }
}
