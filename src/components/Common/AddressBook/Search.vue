<template>
  <div class="search-contacts">
    <Dropdown trigger="custom" placement="bottom-start" :visible="visible">
      <Input
        v-model="value"
        prefix="ios-search"
        placeholder="搜索"
        @on-focus="onFocus"
        @on-change="onChange"
      />
      <DropdownMenu slot="list">
        <div v-show="loading" class="loading">
          <Icon type="ios-loading" :size="16" />搜索中,请稍后...
        </div>
        <div v-show="showNoContent" class="no-search-content">
          <Icon type="ios-alert" :size="50" />
          <h4>没有数据</h4>
        </div>
        <Contacts
          id="contacts-list"
          :multiple="multiple"
          :contacts="contacts"
          @on-contacts-checked="onSelected"
        ></Contacts>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import config from "@/config";
import $ from "jquery";
import Contacts from "./Contacts.vue";
import Http from "utils/http";
export default {
  name: "SearchContacts",
  components: {
    Contacts
  },
  data() {
    return {
      value: "",
      visible: false,
      loading: false,
      showNoContent: false,
      contacts: []
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.off();
  },
  methods: {
    init() {
      this.$doc = $(document);
      this.$search = $(this.$el).find(".ivu-dropdown");
      this.$contacts = $("#contacts-list");
      this.onClickDoc = this.onClickDoc.bind(this);
      this.onClick = this.onClick.bind(this);
      this.on();
    },
    setWidth() {
      const width = $(".search-contacts").width();
      $(".ivu-dropdown").width(width);
    },
    isShowNoContent() {
      return !this.contacts || !this.contacts.length;
    },
    search(name) {
      const requestData = {
        search: name,
        page: 1,
        pageSize: 500
      };
      this.loading = true;
      this.showNoContent = false;
      this.contacts = [];
      Http.post({
        url: config.apiUrl.searchContacts,
        data: requestData,
        loading: false,
        succeed: (res, data) => {
          this.loading = false;
          this.contacts = data;
          this.showNoContent = this.isShowNoContent();
        }
      });
    },
    onFocus() {
      if (this.contacts && this.contacts.length) {
        this.visible = true;
        this.setWidth();
      }
    },
    onChange(e) {
      const value = e.target.value;
      this.value = value;
      this.visible = true;
      this.setWidth();
      this.search(value);
    },
    onClickDoc() {
      this.visible = false;
    },
    onClick(e) {
      e.stopPropagation();
    },
    onSelectedContacts() {
      if (!this.multiple) {
        this.onClickDoc();
      }
    },
    onSelected(item) {
      const name = item.userName;
      this.value = name;
    },
    on() {
      this.$doc.on("click", this.onClickDoc);
      this.$search.on("click", this.onClick);
      this.$contacts.on("click", this.onSelectedContacts);
    },
    off() {
      this.$doc.off("click", this.onClickDoc);
      this.$search.off("click", this.onClick);
      this.$contacts.off("click", this.onSelectedContacts);
    }
  }
};
</script>

<style lang="less">
.df-addressbook {
  .search-contacts {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    background-color: #fff;
    .no-search-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 90%;
      color: #a3a3a3;
      h4 {
        font-size: 12px;
        font-weight: 500;
      }
    }
    .ivu-dropdown {
      width: 100%;
    }
    .ivu-select-dropdown {
      min-height: 60px;
      max-height: 290px;
      overflow-y: auto;
      .contacts {
        margin-top: 0;
      }
    }
    .loading {
      color: #a3a3a3;
      padding: 7px 20px;
      .ivu-icon {
        margin-right: 8px;
        animation: loading 1s linear infinite;
      }
    }
  }
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>