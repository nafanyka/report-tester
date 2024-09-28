export default {
    events() {
        document.getElementById('btnRunReport').addEventListener('click', () => {
            this.runReport();
        });

        document.getElementById('btnViewRunReport').addEventListener('click', (e) => {
            const button = e.target.closest('button#btnViewRunReport');
            if (button) {
                if (button.hasAttribute("data-history-log-id")) {
                    window.requestLogHistory.show(button.getAttribute("data-history-log-id"));
                }
            }
        }, { capture: true, passive: true });
    }
}
