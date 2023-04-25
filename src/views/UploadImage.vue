<template>
  <p class="h1 text-center">Image Upload</p>
  <form action="" @submit.prevent="upload()">
    <input
      type="file"
      multiple
      class="form-control m-auto w-75"
      id="customFile"
      @change="previewImages"
      ref="imageInput"
    />
    <button type="submit" class="btn btn-primary mx-auto my-3 d-flex">
      Submit
    </button>
  </form>
  <div class="d-flex justify-content-center preview-img-div">
    <div v-for="(previewUrl, index) in imagePreviewUrls" :key="index">
      <img :src="previewUrl" class="img-thumbnail preview-img" />
    </div>
  </div>

  <div v-if="uploadProgress !== null">
    <progress :value="uploadProgress" max="100"></progress>
    <span>{{ uploadProgress }}%</span>
  </div>

  <!--progress bar-->
  <!-- <div id="prog-bar-container">
    <div v-if="currentImage" class="progress" id="progress-bar-div">
      <div
        class="progress-bar progress-bar-info fs-5"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>
  </div> -->

  <HeaderComp />
  <button
    type="click"
    class="btn btn-primary mx-auto my-3 d-flex"
    @click="getImages"
  >
    Get Images
  </button>
  <!--image display gallery-->
  <div class="img-container">
    <div
      v-for="image in this.$store.state.ImageList"
      :key="image"
      class="img-div"
    >
      <img class="img" :src="image" :alt="image" />
    </div>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  data() {
    return {
      imagePreviewUrls: [],
      uploadProgress: null
    };
  },
  components: {
    HeaderComp: HeaderComp,
  },
  methods: {
    previewImages(event) {
      this.$store.state.headerTitle = "";
      const files = event.target.files;

      const imagePreviewUrls = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviewUrls.push(e.target.result);
          if (imagePreviewUrls.length === files.length) {
            this.imagePreviewUrls = imagePreviewUrls;
          }
        };
        reader.readAsDataURL(files[i]);
      }
    },
    upload() {
      const formData = new FormData();
      var ins = this.$refs.imageInput.files.length;
      for (var x = 0; x < ins; x++) {
        formData.append("image", this.$refs.imageInput.files[x]);
      }

      this.$store.dispatch("UploadFileService", formData).then((response) => {
        this.$refs.imageInput.value = "";
        this.imagePreviewUrls = [];
        this.$store.commit("LoggedInMsg", response.data.message);
      });
    },
    getImages() {
      this.$store.dispatch("GetImages");
      //   .then((response) => {
      // this.$store.commit("LoggedInMsg", response.data.message);
      //   });
    },
  },
};
</script>

<style scoped>
.preview-img {
  max-height: 500px;
  object-fit: scale-down;
  z-index: 1;
}

.img-container {
  width: 100%;
  columns: 5;
  column-gap: 0px;
}

.img-div {
  padding: 10px;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
