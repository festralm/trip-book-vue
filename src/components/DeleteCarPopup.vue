<template>
  <div>
    <vue-modaltor :visible="open" @hide="open=false" :default-width="'400px'"
                  :bg-panel="'#eadbdb'">>
      <template #header>
        <div class="text-center my-text m-2">
          <p>Вы уверены, что хотите удалить этот автомобиль?</p>
        </div>
      </template>
      <template #body>
        <div class="buttons text-center">
          <b-button variant="success" class=" m-2" @click="$emit('revertDeletingCar')">Нет</b-button>
          <b-button variant="danger" class="m-2" @click="$emit('deleteCar')">Да</b-button>
        </div>
      </template>
    </vue-modaltor>
  </div>
</template>

<script>
export default {
  name: "DeleteCarPopup",
  props: {
    open: null,
  }
}
</script>

<style scoped>
.my-text {
  font-size: 15px;
}
</style>
