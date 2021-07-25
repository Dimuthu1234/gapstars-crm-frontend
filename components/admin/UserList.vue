<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>E-mail address</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <b-button
              v-b-modal.modal-2
              class="btn btn-sm btn-primary"
              @click.prevent="editUser(user)"
            >
              Edit
            </b-button>
            <b-button
              class="btn btn-sm btn-primary"
              @click.prevent="deleteUser(user)"
              >Delete</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal
      id="modal-2"
      ref="user-modal-edit"
      hide-footer
      title="Edit User"
    >
      <form class="signup-form" @submit.prevent="updateUser">
        <div class="form-group">
          <label>Name</label>
          <input
            id="name_edit"
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Enter your name"
            name="name"
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            id="email_edit"
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="Enter your email"
            name="email"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            id="password_edit"
            v-model="form.password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            name="password"
          />
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input
            id="password_confirm_edit"
            v-model="form.password_confirmation"
            type="password"
            class="form-control"
            placeholder="Enter your password for confirmation"
            name="password_confirmation"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Edit User
        </button>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["users"],
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    async updateUser() {
      try {
        this.$axios.setBaseURL("http://localhost:8000");
        await this.$axios
          .put("api/user/" + this.$route.query.userId, this.form)
          .then(response => {
            if (response.status === 200) {
              this.fetchUsers();
              this.$refs["user-modal-edit"].hide();

              this.form.name = "";
              this.form.email = "";
              this.form.password = "";
              this.form.password_confirmation = "";

              this.$toast.success("User updated successfully!...");
            } else {
              this.$toast.error("Invalid data!...");
            }
          })
          .catch(e => {
            this.$toast.error(e);
          });
      } catch (e) {
        this.$toast.error(e.message);
      }
    },

    async editUser(user) {
      this.$router.push(
        {
          query: {
            ...this.$route.query,
            userId: user.id
          }
        },
        () => {}
      );
      this.form.name = user.name;
      this.form.email = user.email;
    },

    async deleteUser(user) {
      try {
        this.$axios.setBaseURL("http://localhost:8000");
        await this.$axios
          .delete("api/user/" + user.id)
          .then(response => {
            if (response.status === 204) {
              this.fetchUsers();
              this.$toast.success("User deleted successfully!...");
            } else {
              this.$toast.error("Invalid data!...");
            }
          })
          .catch(e => {
            this.$toast.error(e);
          });
      } catch (e) {
        this.$toast.error(e.message);
      }
    },

    async fetchUsers() {
      this.$axios.setBaseURL("http://localhost:8000");
      let usersData = await this.$axios.get("api/all-user");
      this.users = usersData.data;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
h3 {
  cursor: pointer;
}
</style>
