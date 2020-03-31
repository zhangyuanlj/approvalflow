const hashChangeMixin = {
    methods: {
        isReload(oldURL, newURL) {
            return (oldURL.indexOf("id") !== -1 && newURL.indexOf("id") === -1) || (oldURL.indexOf("id") === -1 && newURL.indexOf("id") !== -1);
        },
        hashChange(e) {
            const oldURL = e.oldURL;
            const newURL = e.newURL;
            if (this.isReload(oldURL, newURL)) {
                window.location.reload();
            }
        },
        bindHash() {
            // window.addEventListener('hashchange', this.hashChange, false);
        },
        unBindHash() {
            // window.removeEventListener('hashchange', this.hashChange, false);
        }
    }
};
export default hashChangeMixin;