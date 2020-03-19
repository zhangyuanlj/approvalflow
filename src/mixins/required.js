const requiredMixin = {
    data() {
        return {
            required: false
        };
    },
    methods: {
        onTitleChange(e) {
            if (this.required) {
                const title = e.target.value;
                const rules = [{
                    required: true,
                    message: `${title}不能为空`,
                    trigger: "change"
                }];
                this.updateValidation({
                    name: this.attribute.name,
                    rules: rules
                });
            }
        },
        onChange(required) {
            let rules = [];
            this.required = required;
            if (required) {
                rules = [{
                    required: true,
                    message: `${this.attribute.title}不能为空`,
                    trigger: "change"
                }];
            }
            this.updateValidation({
                name: this.attribute.name,
                rules: rules
            });
        }
    }
};
export default requiredMixin;