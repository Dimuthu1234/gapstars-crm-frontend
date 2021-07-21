<template>
  <tr>
    <td class="name">
      <img :src="item.image" alt="image" />
      {{ item.name }}
      &nbsp;<span class="btn btn-primary btn-file">
        Browse
        <input
          id="file-input"
          type="file"
          accept="image/*"
          @change="uploadImage($event)"
        />
      </span>
    </td>
    <td>${{ item.price }}</td>
    <td>{{ item.quantity }}</td>
    <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
    <td><span class="badge badge-primary">Received</span></td>
  </tr>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    async uploadImage(event) {
      this.$axios.setBaseURL("http://localhost:8000");

      let data = new FormData();
      data.append("name", "customer_profile");
      data.append("file", event.target.files[0]);

      let config = {
        header: {
          "Content-Type": "image/png"
        }
      };

      await this.$axios
        .post("api/customer-profile-upload", data, config)
        .then(response => {
          console.log("image upload response > ", response);
        });
    }
  }
};
</script>
