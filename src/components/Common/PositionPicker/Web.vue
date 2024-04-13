<template>
  <div class="v-web-position-picker">
    <div id="container" class="container"></div>
    <div class="result-pannel">
      <Card :bordered="false" :shadow="true" v-if="selectedPosition !== null">
        <div slot="title" class="result-title">
          <Icon type="ios-navigate"></Icon>选址结果
        </div>
        <div class="result-content">
          <template v-if="isMobile">
            <p>{{ selectedPosition.address }}</p>
          </template>
          <template v-else>
            <p>
              <strong>经纬度:</strong>
              {{ selectedPosition.position.lng }},{{
                selectedPosition.position.lat
              }}
            </p>
            <p>
              <strong>地址:</strong>
              {{ selectedPosition.address }}
            </p>
            <p>
              <strong>最近的路口:</strong>
              {{ selectedPosition.nearestJunction }}
            </p>
            <p>
              <strong>最近的路:</strong>
              {{ selectedPosition.nearestRoad }}
            </p>
            <p>
              <strong>最近的POI:</strong>
              {{ selectedPosition.nearestPOI }}
            </p>
          </template>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
const AMap = window.AMap;
const AMapUI = window.AMapUI;
import { isMobile } from "@/utils/helper";
export default {
  name: "WebPositionPicker",
  data() {
    return {
      selectedPosition: null,
      isMobile: isMobile(),
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const toolBar = new AMap.ToolBar();
      const map = new AMap.Map("container", {
        zoom: 16,
      });
      map.addControl(toolBar);
      AMapUI.loadUI(["misc/PositionPicker"], (PositionPicker) => {
        const positionPicker = new PositionPicker({
          mode: "dragMarker",
          map: map,
        });
        positionPicker.on("success", (positionResult) => {
          this.selectedPosition = positionResult;
          this.$emit("on-select-postion", positionResult);
        });
        positionPicker.on("fail", (err) => {
          window.alert(JSON.stringify(err));
          this.$Message.error({
            content: "没找找到对应的地址，关闭对话框重试！",
          });
        });
        positionPicker.start();
      });
    },
  },
};
</script>
<style lang="less">
.v-web-position-picker {
  height: 100%;
  position: relative;
  .container {
    height: 100%;
  }
  .result-pannel {
    position: absolute;
    right: 10px;
    top: 10px;
    .ivu-card {
      width: 280px;
      min-height: 130px;
    }
  }
  .result-title {
    color: #2d8cf0;
    .ivu-icon {
      margin-right: 5px;
    }
  }
  .result-content {
    color: #444;
    font-size: 12px;
    p {
      margin-bottom: 8px;
    }
    strong {
      display: block;
      font-size: 13px;
      font-weight: bold;
    }
  }
}
@media screen and (min-width: 320px) and (max-width: 768px) {
  .v-web-position-picker {
    .result-pannel {
      position: fixed;
      left: 10px;
      right: 10px;
      top: 60px;
      .ivu-card {
        width: 100%;
        min-height: inherit;
      }
    }
  }
}
</style>
