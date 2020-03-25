<template>
  <div>
    <div v-if="!personList.Contacts.length" class="df-person-list-add">
      <div class="item">
        <div class="label">审批人</div>
        <Input v-model="approver.text" placeholder="请选择" @on-focus="onAddApprover('approver')"></Input>
      </div>
      <div class="item">
        <div class="label">抄送人</div>
        <Input v-model="copygive.text" placeholder="请选择" @on-focus="onAddApprover('copygive')"></Input>
      </div>
    </div>
    <Timeline class="df-person-list">
      <TimelineItem v-for="(item, i) in personList.Contacts" :key="i">
        <div class="content">
          <Card :dis-hover="true">
            <div slot="title">
              <Icon type="ios-people" :size="22" class="title-icon" />
              {{setTitle(item)}}
            </div>
            <a
              v-if="item.type==='approver'"
              href="javascript:void(0);"
              slot="extra"
              @click="onRedirect"
            >
              <Icon type="ios-paper-plane" :size="16" class="title-icon" />流程设置
            </a>
            <Tag
              v-for="(tag, j) in item.value"
              :key="j"
              size="medium"
              :closable="item.add"
              @on-close="onClose(i, j)"
            >{{setName(tag)}}</Tag>
          </Card>
        </div>
      </TimelineItem>
    </Timeline>
    <ContactsModal
      ref="contactsModal"
      :modalTitle="activeField === 'approver' ? '选择审批人' : '选择抄送人'"
      :fieldData="activeField === 'approver' ? approver : copygive"
      @on-addressbook-model-confirm="onContactsModelConfirm"
    ></ContactsModal>
  </div>
</template>

<script>
import {
  GET_NODES_DATA,
  GET_PERSON_LIST,
  UPDATE_PERSON_LIST,
  UPDATE_NODES_DATA
} from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import $ from "jquery";
import { ContactsModal } from "components/Common/AddressBook";
import {
  APPROVER_VALUE,
  COPY_GIVE_VALUE,
  creatId
} from "components/Common/Workflow/scripts/utils";
import { redirect } from "utils/helper";
export default {
  name: "RenderPersonList",
  components: {
    ContactsModal
  },
  data() {
    return {
      activeField: "approver",
      approver: {
        text: "",
        value: []
      },
      copygive: {
        text: "",
        value: []
      },
      itemIndex: 0
    };
  },
  computed: {
    ...mapGetters({
      personList: GET_PERSON_LIST,
      processData: GET_NODES_DATA
    })
  },
  mounted() {},
  methods: {
    ...mapMutations({
      updatePersonList: UPDATE_PERSON_LIST,
      updateProcessData: UPDATE_NODES_DATA
    }),
    getId() {
      return this.$Route.getParam("id");
    },
    setTitle(item) {
      if (item.type === "copygive") {
        return "抄送人";
      }
      return "审批人";
    },
    setName(person) {
      return person.userName ? person.userName : person.menuName;
    },
    onRedirect() {
      const id = this.getId();
      let href = `processDesign/`;
      if (id) {
        href += `?id=${id}`;
      }
      redirect(href);
    },
    onAddApprover(activeField) {
      this.activeField = activeField;
      this.$refs.contactsModal.show();
    },
    onContactsModelConfirm(data) {
      const approverValue = $.extend(true, {}, APPROVER_VALUE);
      const copygiveValue = $.extend(true, {}, COPY_GIVE_VALUE);
      const nodeType = this.activeField;
      const nodeId = creatId(nodeType);
      const nodeText = this.activeField === "approver" ? "审批人" : "抄送人";
      approverValue.members.value = data;
      copygiveValue.contacts.value = data;
      const nodeValue =
        this.activeField === "approver" ? approverValue : copygiveValue;
      const nodeData = {
        id: nodeId,
        pid: "0",
        key: nodeId,
        nodeText: nodeText,
        nodeType: nodeType,
        error: false,
        value: nodeValue
      };
      const start = this.processData[0];
      const mid = this.processData.slice(1, this.processData.length - 1);
      const end = this.processData[this.processData.length - 1];
      const text = this.$refs.contactsModal.setValue(data);
      mid.push(nodeData);
      const updateData = [...[start], ...mid, ...[end]];
      this[this.activeField] = {
        text: text,
        value: data
      };
      this.updateProcessData(updateData);
    }
  }
};
</script>

<style lang="less">
.df-person-list {
  .content {
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    .title-icon {
      margin-right: 5px;
    }
    .ivu-card {
      .ivu-card-head {
        padding: 10px 16px;
        .ivu-icon {
          color: #515a6e;
        }
        .title-icon {
          vertical-align: -5px;
        }
      }
      .ivu-card-extra {
        top: 10px;
      }
    }
  }
  &-add {
    .item {
      margin-bottom: 15px;
    }
    .label {
      font-size: 14px;
      color: #515a6e;
      margin-bottom: 10px;
    }
  }
}
</style>