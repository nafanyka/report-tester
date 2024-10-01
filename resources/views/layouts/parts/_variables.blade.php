<script type="application/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        @if(!empty($currentEnv))
        window.environment.current = {{ \Illuminate\Support\Js::from($currentEnv) }};
        @endif

        @if(!empty($envs))
        window.environment.items = {{\Illuminate\Support\Js::from($envs) }};
        @endif

        @if(!empty($authToken))
        document.getElementById('inputAuthToken').value = {{\Illuminate\Support\Js::from($authToken) }};
        @endif
        @if(!empty($metrics))
        window.metrics.metrics = {{\Illuminate\Support\Js::from($metrics) }};
        @endif
        @if(!empty($slices))
        window.slices.slices = {{\Illuminate\Support\Js::from($slices) }};
        @endif
        @if(!empty($filterValues))
        window.slices.filterValues = {{\Illuminate\Support\Js::from($filterValues) }};
        @endif
        @if(!empty($selectedMetrics))
        window.metrics.checked = {{\Illuminate\Support\Js::from($selectedMetrics) }};
        @endif
        @if(!empty($selectedSlices))
        window.slices.checked = {{\Illuminate\Support\Js::from($selectedSlices) }};
        @endif
        @if(!empty($customFilters))
        window.customFilter.configs = {{\Illuminate\Support\Js::from($customFilters) }};
        @endif
        @if(!empty($customFilterValues))
        window.customFilter.currentValues = {{\Illuminate\Support\Js::from($customFilterValues) }};
        @endif
    });

    @if(!empty($selectedSlices))
    var initSelectedSlices = {{\Illuminate\Support\Js::from($selectedSlices) }};
    @endif
</script>
