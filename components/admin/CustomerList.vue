<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>E-mail address</th>
          <th>Phone number (S.)</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.first_name }}</td>
          <td>{{ customer.last_name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ numbersArr(customer.phone_numbers) }}</td>
          <td>
            <b-button
              v-b-modal.modal-2
              class="btn btn-sm btn-primary"
              @click.prevent="editCustomer(customer)"
            >
              Edit
            </b-button>
            <b-button
              class="btn btn-sm btn-primary"
              @click.prevent="deleteCustomer(customer)"
              >Delete</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal
      id="modal-2"
      ref="customer-modal-edit"
      hide-footer
      title="Edit Customer"
    >
      <form class="signup-form" @submit.prevent="updateCustomer">
        <div class="form-group">
          <label>First Name</label>
          <input
            id="first_name_edit"
            v-model="form.first_name"
            type="text"
            class="form-control"
            placeholder="Enter your first name"
            name="first_name"
          />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input
            id="last_name_edit"
            v-model="form.last_name"
            type="text"
            class="form-control"
            placeholder="Enter your last name"
            name="last_name"
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
          <label style="display: flex"
            >Telephone Number (s.) &nbsp;&nbsp;
            <a @click="addNumberEdit"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-plus-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line></svg></a
          ></label>

          <div
            v-for="input in form.phone_numbers"
            :key="input.id"
            style="display: flex"
            class="inputArea"
          >
            <input
              :id="input.id"
              v-model="input.value"
              type="text"
              class="form-control"
              placeholder="Enter your telephone number"
              name="telephone"
              style="margin-top: 10px"
            />
            <a
              style="padding-top: 20px; padding-left: 10px"
              @click="removeNumberEdit(input.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </a>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Edit Customer
        </button>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["customers"],
  data() {
    return {
      counter: 0,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        phone_numbers: [
          {
            id: "number0",
            label: "Enter phone number",
            value: ""
          }
        ]
      }
    };
  },
  methods: {
    addNumberEdit() {
      this.form.phone_numbers.push({
        id: `number${++this.counter}`,
        label: "Enter phone number",
        value: ""
      });
    },
    // eslint-disable-next-line no-unused-vars
    removeNumberEdit(inputId) {
      let filteredNumber = this.form.phone_numbers.filter(
        input => input.id === inputId
      );
      this.form.phone_numbers.splice(filteredNumber, 1);
    },
    numbersArr(phoneNumbers) {
      let i;
      let pna = [];
      for (i = 0; i <= phoneNumbers.length - 1; i++) {
        pna.push(phoneNumbers[i]["number"]);
      }
      return pna.join(" | ");
    },
    async updateCustomer() {
      try {
        this.$axios.setBaseURL("http://localhost:8000");
        await this.$axios
          .put("api/customer/" + this.$route.query.customerId, this.form)
          .then(response => {
            if (response.status === 200) {
              this.fetchCustomers();
              this.$refs["customer-modal-edit"].hide();
              this.$toast.success("Customer updated successfully!...");
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

    async editCustomer(customer) {
      this.$router.push(
        {
          query: {
            ...this.$route.query,
            customerId: customer.id
          }
        },
        () => {}
      );

      this.form.first_name = customer.first_name;
      this.form.last_name = customer.last_name;
      this.form.email = customer.email;
      this.form.phone_numbers = customer.phone_numbers.map(num => {
        let numberObject = {};
        numberObject["id"] = `number${num.id}`;
        numberObject["label"] = "Enter phone number";
        numberObject["value"] = num.number;

        return numberObject;
      });
    },

    async deleteCustomer(customer) {
      try {
        this.$axios.setBaseURL("http://localhost:8000");
        await this.$axios
          .delete("api/customer/" + customer.id)
          .then(response => {
            if (response.status === 204) {
              this.fetchCustomers();
              this.$toast.success("Customer deleted successfully!...");
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

    async fetchCustomers() {
      this.$axios.setBaseURL("http://localhost:8000");
      let customersData = await this.$axios.get("api/customer");
      this.customers = customersData.data;
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
