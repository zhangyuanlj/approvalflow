export default {
    Checkbox: function (item) {
        return [{
            required: true,
            validator: function (rule, value, callback) {
                if (!value.length) {
                    callback(new Error(`${item.attribute.title}不能为空`));
                } else {
                    callback();
                }
            },
            trigger: "change"
        }];
    },
    DateTimeRange: function (item) {
        return [{
            validator: function (rule, value, callback) {
                const required = item.attribute.validation.required;
                if (required && !value[0]) {
                    callback(new Error(`${item.attribute.startDateTitle}不能为空`));
                } else if (required && !value[1]) {
                    callback(new Error(`${item.attribute.endDateTitle}不能为空`));
                } else {
                    const startTime = new Date(value[0]).getTime();
                    const endTime = new Date(value[1]).getTime();
                    if (startTime >= endTime) {
                        callback(new Error(`${item.attribute.startDateTitle}不能大于${item.attribute.endDateTitle}`));
                    } else {
                        callback();
                    }
                }
            },
            trigger: "change"
        }];
    },
    Attachment: function (item) {
        return [{
            required: true,
            validator: function (rule, value, callback) {
                if (!value.length) {
                    callback(new Error(`${item.attribute.title}不能为空`));
                } else {
                    callback();
                }
            },
            trigger: "change"
        }];
    },
    Image: function (item) {
        return [{
            required: true,
            validator: function (rule, value, callback) {
                if (!value.length) {
                    callback(new Error(`${item.attribute.title}不能为空`));
                } else {
                    callback();
                }
            },
            trigger: "change"
        }];
    },
    Contacts: function (item) {
        return [{
            required: true,
            validator: function (rule, value, callback) {
                if (!value.length) {
                    callback(new Error(`${item.attribute.title}不能为空`));
                } else {
                    callback();
                }
            },
            trigger: "change"
        }];
    },
    Departments: function (item) {
        return [{
            required: true,
            validator: function (rule, value, callback) {
                if (!value.length) {
                    callback(new Error(`${item.attribute.title}不能为空`));
                } else {
                    callback();
                }
            },
            trigger: "change"
        }];
    },
    defaultValidator: function (item) {
        return item.attribute.validationRules;
    }
};