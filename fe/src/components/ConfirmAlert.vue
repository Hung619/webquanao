<template>
  <transition name="fade">
    <div v-if="visible" class="alert" :class="`alert--${type}`">
      <div class="alert__body">
        <h4>{{ title }}</h4>
        <p>{{ message }}</p>
        <div class="alert__buttons">
          <button class="btn-confirm" @click="handleConfirm">Xác nhận</button>
          <button class="btn-cancel" @click="closeAlert">Hủy</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
    type: {
      type: String,
      default: "warning",
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showAlert() {
      this.visible = true;
    },
    closeAlert() {
      this.visible = false;
      this.$emit("close");
    },
    handleConfirm() {
      this.$emit("confirm");
      this.closeAlert();
    },
  },
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
  text-align: center;
}
.alert__buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.btn-confirm {
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-cancel {
  background-color: #dc3545;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
