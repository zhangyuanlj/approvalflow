<template>
  <div>
    <Form label-position="top">
      <FormItem>
        <span slot="label" class="label">审批人去重</span>
        <Select v-model="advancedSetting.approverDuplication">
          <Option
            v-for="item in duplicateList"
            :value="item.value"
            :key="item.value"
          >{{ item.text }}</Option>
        </Select>
        <p class="duplicate-help">
          <Checkbox v-model="advancedSetting.autoPass">发起人审批时自动通过</Checkbox>
          <Tooltip content="审批人和发起人是同一个人时，将自动通过。设置为发起人的审批节点不会自动通过">
            <div class="rel-content">
              <Icon type="ios-help-circle-outline" />
            </div>
          </Tooltip>
        </p>
      </FormItem>
      <FormItem>
        <span slot="label" class="label">通知抄送人</span>
        <p>
          通知抄送人设置已移到流程设计中，
          <a href="javascript:void(0);" @click="onLook">查看设置方法</a>
        </p>
      </FormItem>
      <FormItem>
        <span slot="label" class="label">
          审批意见填写提示
          <strong>最多100字</strong>
        </span>
        <Input v-model="advancedSetting.approvalComments" placeholder="请输入"></Input>
      </FormItem>
      <FormItem>
        <span slot="label" class="label">审批意见</span>
        <CheckboxGroup v-model="advancedSetting.approvalOpinion">
          <span v-for="(item, i) in approvalOpinion" :key="i" class="checkbox-item">
            <Checkbox :label="item.value">{{item.text}}</Checkbox>
            <Tooltip v-if="i === 0" content="如勾选，审批人必须填写意见才可提交审批结果">
              <div class="rel-content">
                <Icon type="ios-help-circle-outline" />
              </div>
            </Tooltip>
            <Tooltip v-if="i === 1" content="如勾选，评语仅审批人和管理员可见">
              <div class="rel-content">
                <Icon type="ios-help-circle-outline" />
              </div>
            </Tooltip>
          </span>
        </CheckboxGroup>
      </FormItem>
    </Form>
    <Modal v-model="visible" title="查看设置方法" :width="600" :hide-footer="true">
      <img :src="helpImg" width="100%" />
    </Modal>
  </div>
</template>

<script>
import { GET_ADVANCED_SETTING } from "store/modules/advancedSetting/type";
import { mapGetters } from "vuex";
import { duplicateList, approvalOpinion } from "./scripts/data";
import helpImg from "./images/help-img.png";
export default {
  name: "AdvancedSettingForm",
  data() {
    return {
      visible: false,
      duplicateList: duplicateList,
      approvalOpinion: approvalOpinion,
      helpImg: helpImg
    };
  },
  computed: {
    ...mapGetters({
      advancedSetting: GET_ADVANCED_SETTING
    })
  },
  methods: {
    onLook() {
      this.visible = true;
    }
  }
};
</script>