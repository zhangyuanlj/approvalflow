<template>
  <div class="add-contacts">
    <div class="icon">
      <Icon type="md-person-add" :size="20" />
    </div>
    <div class="text">
      <h4>添加新同事</h4>
      <p>添加不在通讯录的新同事</p>
    </div>
    <div class="arrow">
      <Icon type="ios-arrow-forward" :size="24" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AddContacts"
};
</script>

<style lang="less">
@white-color: #fff;
@primary-color: #399efa;
.df-addressbook {
  .add-contacts {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    background-color: @white-color;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      background-color: @primary-color;
      border-radius: 100%;
      .ivu-icon {
        color: @white-color;
      }
    }
    .text {
      flex: 3;
      margin: 0 15px;
      h4 {
        font-weight: 600;
        font-size: 14px;
      }
    }
    .arrow {
      .ivu-icon {
        color: #d4d4d4;
      }
    }
  }
}
</style>