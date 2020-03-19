<template>
  <div>
    <Timeline class="df-person-list">
      <TimelineItem v-for="(item, i) in personList" :key="i">
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
            <a v-if="item.add" href="javascript:void(0);" slot="extra" @click="onAdd(item, i)">
              <Icon type="md-add-circle" :size="16" class="title-icon" />添加
            </a>
            <Tag
              v-for="(tag, j) in item.items"
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
      modalTitle="选择抄送人"
      :fieldData="contacts"
      @on-contacts-model-confirm="onContactsModelConfirm"
    ></ContactsModal>
  </div>
</template>

<script>
import {
  GET_PERSON_LIST,
  UPDATE_PERSON_LIST
} from "store/modules/workflow/type";
import { mapGetters, mapMutations } from "vuex";
import { ContactsModal } from "components/Common/AddressBook";
import { redirect } from "utils/helper";
export default {
  name: "RenderPersonList",
  components: {
    ContactsModal
  },
  data() {
    return {
      contacts: {
        value: []
      },
      itemIndex: 0
    };
  },
  computed: {
    ...mapGetters({
      personList: GET_PERSON_LIST
    })
  },
  methods: {
    ...mapMutations({
      updatePersonList: UPDATE_PERSON_LIST
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
    onClose(i, j) {
      const personList = this.personList;
      const items = personList[i].items;
      items.splice(j, 1);
      this.updatePersonList(personList);
    },
    onAdd(item, i) {
      this.contacts.value = item.items;
      this.itemIndex = i;
      this.$refs.contactsModal.show();
    },
    onContactsModelConfirm(data) {
      const personList = this.personList;
      personList[this.itemIndex].items = data;
      this.updatePersonList(personList);
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
}
</style>