<script type="application/javascript">
    @if(!empty($currentEnv))
    var initCurrentEnv = {{ \Illuminate\Support\Js::from($currentEnv) }};
    @endif
    @if(!empty($authToken))
    var initAuthToken = {{\Illuminate\Support\Js::from($authToken) }};
    @endif
    @if(!empty($currentReport))
    var initCurrentReport = {{\Illuminate\Support\Js::from($currentReport) }};
    @endif
    @if(!empty($reports))
    var initReports = {{\Illuminate\Support\Js::from($reports) }};
    @endif
    @if(!empty($envs))
    var initEnvs = {{\Illuminate\Support\Js::from($envs) }};
    @endif
    @if(!empty($metrics))
    var initMetrics = {{\Illuminate\Support\Js::from($metrics) }};
    @endif
    @if(!empty($slices))
    var initSlices = {{\Illuminate\Support\Js::from($slices) }};
    @endif
    @if(!empty($selectedMetrics))
    var initSelectedMetrics = {{\Illuminate\Support\Js::from($selectedMetrics) }};
    @endif
    @if(!empty($selectedSlices))
    var initSelectedSlices = {{\Illuminate\Support\Js::from($selectedSlices) }};
    @endif
</script>
