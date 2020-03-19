import {
    INIT_FIELD_LISTS,
    UPDATE_FIELD_LISTS
} from "./type";

const actions = {
    [INIT_FIELD_LISTS]({
        commit
    }) {
        const items = () => {
            const items = [];
            for (let i = 0; i < 10; i++) {
                const name = `单行输入框(${i + 1})`;
                items.push({
                    name: name,
                    component: "Input",
                    attribute: {
                        name: name,
                        title: name,
                        props: {
                            placeholder: "请输入",
                            maxlength: 1000
                        },
                        validation: {
                            required: false
                        }
                    }
                });
            }
            return items;
        };
        return new Promise(function (resolve) {
            setTimeout(() => {
                const data = items();
                commit(UPDATE_FIELD_LISTS, data);
                resolve(data);
            }, 1000);
        });
    }
};

export default actions;