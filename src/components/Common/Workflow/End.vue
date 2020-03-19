<template>
<div class="process-end-node">
    <div class="circle"></div>
    <span>流程结束</span>
</div>
</template>

<script>
export default {
    name: "End",
    props: {
        nodeData: {
            type: Object,
            default: () => {
                return {};
            }
        }
    }
};
</script>
