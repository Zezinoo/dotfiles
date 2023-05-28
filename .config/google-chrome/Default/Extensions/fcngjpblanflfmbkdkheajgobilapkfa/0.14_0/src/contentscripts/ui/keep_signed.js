jQuery(document).ready(() => {
    try {
        let inputs = document.querySelectorAll('input[name="rememberMe"]');
        inputs.forEach((node) => {
            if (node.checked === false) {
                node.checked = true;
            }
        });
    } catch (e) {
    }
});
