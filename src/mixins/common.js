import config from "@/config";
import {
    redirect
} from "utils/helper";
const commonMixin = {
    methods: {
        getId() {
            return this.$Route.getParam("id");
        },
        goHome() {
            const fromUrl = this.$Route.getParam("fromUrl");
            const href = fromUrl ? decodeURIComponent(fromUrl) : config.homeUrl;
            window.location.href = href;
        },
        redirect(routeUrl) {
            const id = this.getId();
            let href = routeUrl;
            if (id) {
                href += `?id=${id}`;
            }
            redirect(href);
        }
    }
};
export default commonMixin;