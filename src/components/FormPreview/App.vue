<template>
  <FormRender :isPreview="true"></FormRender>
</template>

<script>
import FormRender from "FormRender/Web/Render.vue";
export default {
  name: "AppFormPreviewView",
  components: { FormRender }
};
</script>