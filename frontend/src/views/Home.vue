<template>
  <div class="home" @click="home">
    <div class="container">
      <div class="row d-flex justify-content-end align-items-center">
          <button v-if="alert.length" :disabled=true class="btn btn-warning">
          <b>{{alert[0]}}</b></button>
          <button class="btn btn-success" data-toggle="modal" data-target="#addModal">
            <b>Add Contact</b>
          </button>
      </div>
    </div>

    <div class="container table-responsive">
      <DataTable
        :value="contacts"
        class="table-bordered table-hover"
        :paginator="true"
        :rows="4"
        :filters="filters"
        columnResizeMode="expand"
        :resizableColumns="true"
      >
        <template #header>
          <div style="text-align: right">
            <i class="pi pi-search" style="margin: 4px 4px 0px 0px;"></i>
            <input
              class="search-style"
              v-model="filters['global']"
              placeholder="Search a contact"
              size="60"
            />
          </div>
        </template>
        <Column v-for="col of columns " :field="col.field" :header="col.header" :key="col.field"></Column>
        <Column field="actions" header="Actions">
          <template #body="slotProps">
            <Button class="btn btn-danger" v-on:click="del(slotProps)">
              <i class="pi pi-trash"></i>
            </Button>
            <Button
              class="btn btn-success"
              v-on:click="edit(slotProps)"
              data-toggle="modal"
              data-target="#updateModal"
            >
              <i class="pi pi-pencil p-button-warning"></i>
            </Button>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="updateModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="updateModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateModalLabel">Enter new details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="firstname" class="col-form-label">Firstname:</label>
                <input
                  type="text"
                  class="form-control form__input"
                  v-model.trim="$v.updateUser.firstname.$model"
                />
                <div v-if="$v.updateUser.firstname.$dirty && $v.updateUser.firstname.$invalid">
                  <div class="error" v-if="!$v.updateUser.firstname.required">first name is required</div>
                  <div
                    class="error"
                    v-if="!$v.updateUser.firstname.minLength"
                  >first name must have at least {{$v.updateUser.firstname.$params.minLength.min}} letters.</div>
                </div>
              </div>

              <div class="form-group">
                <label for="lastname" class="col-form-label">Lastname:</label>
                <input
                  type="text"
                  class="form-control form__input"
                  v-model.trim="$v.updateUser.lastname.$model"
                />
                <div v-if="$v.updateUser.lastname.$dirty && $v.updateUser.lastname.$invalid">
                  <div class="error" v-if="!$v.updateUser.lastname.required">last name is required</div>
                </div>
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Email:</label>
                <input
                  type="text"
                  class="form-control form__input"
                  v-model.trim="$v.updateUser.email.$model"
                />
                <div v-if="$v.updateUser.email.$dirty && $v.updateUser.email.$invalid">
                  <div class="error" v-if="!$v.updateUser.email.required">email is required</div>
                  <div class="error" v-if="!$v.updateUser.email.email">email is invalid</div>
                </div>
              </div>
              <div class="form-group">
                <label for="phone" class="col-form-label">Phone:</label>
                <input
                  type="text"
                  class="form-control form__input"
                  v-model.trim="$v.updateUser.phone.$model"
                />
                <div v-if="$v.updateUser.phone.$dirty && $v.updateUser.phone.$invalid">
                  <div class="error" v-if="!$v.updateUser.phone.phoneNo">phone must have 10 digits</div>
                  <div class="error" v-if="!$v.updateUser.phone.required">phone no. is required</div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  id="update-close"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >Close</button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  id="update-reset"
                  @click="updateReset"
                >Reset</button>
                <button
                  type="button"
                  @click="handleSubmit"
                  class="btn btn-primary"
                  :disabled="$v.updateUser.$invalid"
                  data-dismiss="modal"
                >Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">Enter new contact details</h5>
            <button
              type="button"
              id="add-close-btn"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="firstname" class="col-form-label">Firstname:</label>
                <input type="text" class="form-control" v-model.trim="$v.addUser.firstname.$model" />
                <div v-if="$v.addUser.firstname.$dirty && $v.addUser.firstname.$invalid">
                  <div class="error" v-if="!$v.addUser.firstname.required ">first name is required</div>
                  <div
                    class="error"
                    v-if="!$v.addUser.firstname.minLength"
                  >first name must have at least {{$v.addUser.firstname.$params.minLength.min}} letters.</div>
                </div>
              </div>
              <div class="form-group">
                <label for="lastname" class="col-form-label">Lastname:</label>
                <input type="text" class="form-control" v-model.trim="$v.addUser.lastname.$model" />
                <div v-if="$v.addUser.lastname.$dirty && $v.addUser.lastname.$invalid">
                  <div class="error" v-if="!$v.addUser.lastname.required">last name is required</div>
                </div>
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Email:</label>
                <input type="text" class="form-control" v-model.trim="$v.addUser.email.$model" />
                <div v-if="$v.addUser.email.$dirty && $v.addUser.email.$invalid">
                  <div class="error" v-if="!$v.addUser.email.required">email is required</div>
                  <div class="error" v-if="!$v.addUser.email.email">email is invalid</div>
                </div>
              </div>
              <div class="form-group">
                <label for="phone" class="col-form-label">Phone:</label>
                <input type="text" class="form-control" v-model.trim="$v.addUser.phone.$model" />
                <div v-if="$v.addUser.phone.$dirty && $v.addUser.phone.$invalid">
                  <div class="error" v-if="!$v.addUser.phone.phoneNo">phone no. must have 10 digits.</div>
                  <div class="error" v-if="!$v.addUser.phone.required">phone is required</div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="addReset"
                  data-dismiss="modal"
                >Close</button>
                <button type="button" class="btn btn-secondary" @click="addReset">Reset</button>
                <button
                  type="button"
                  @click="handleAddSubmit"
                  :disabled="$v.addUser.$invalid"
                  class="btn btn-primary"
                  data-dismiss="modal"
                >Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import UserService from "../service/user.service.js";
import ContactService from "../service/contact.service.js";
import $ from "jquery";
import { helpers } from "vuelidate/lib/validators";
import { required, minLength, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { log } from "util";
const phoneNo = helpers.regex("phoneNo", /^\d{10}$/);

export default {
  name: "home",
  components: {
    DataTable,
    Column
  },
  data: function() {
    return {
      userInfo: [],
      contacts: [],
      columns: [],
      filters: {},
      user_id: {},
      alert: [],
      updateUser: {
        id: 1,
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        user_id: 1
      },
      addUser: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        user_id: 1
      }
    };
  },
  validations: {
    updateUser: {
      firstname: {
        required,
        minLength: minLength(3)
      },
      lastname: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        phoneNo
      }
    },

    addUser: {
      firstname: {
        required,
        minLength: minLength(3)
      },
      lastname: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        phoneNo
      }
    }
  },
  userService: null,
  contactService: null,
  created() {
    this.userService = new UserService();
    this.contactService = new ContactService();
    this.columns = [
      { field: "firstname", header: "Firstname" },
      { field: "lastname", header: "Lastname" },
      { field: "email", header: "Email" },
      { field: "phone", header: "Phone" }
    ];
  },
  watch: {},
  async mounted() {
    try {
      this.user_id = localStorage.getItem("id");
      this.addUser.user_id = this.user_id;
      this.contacts = await this.contactService.getContactByUserId(
        this.user_id
      );
      this.userInfo = await this.userService.getUserById(this.user_id);
      localStorage.setItem("userFirstname", this.userInfo.firstname);
      localStorage.setItem("userLastname", this.userInfo.lastname);
      localStorage.setItem("userUsername", this.userInfo.username);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    home: function(){
      this.alert=[];
    },
    async del(res) {
      try {
        let result = await this.contactService.deleteById(res.data.id);
        if (result) {
          this.contacts = this.contacts.filter(row => row.id !== res.data.id);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async edit(res) {
      this.updateUser = Object.assign({}, res.data);
      this.updateUser.id = res.data.id;
      this.user_id = res.data.user_id;
    },

    addReset: function() {
      this.addUser.firstname = this.addUser.lastname = this.addUser.email = this.addUser.phone =
        "";
      this.$v.addUser.$reset();
    },

    updateReset: async function() {
      this.updateUser.firstname = this.updateUser.lastname = this.updateUser.email = this.updateUser.phone =
        "";
      this.$v.updateUser.$reset();
    },

    handleSubmit: async function(res) {
      this.$v.updateUser.$touch();

      if (!this.$v.updateUser.$error && !this.$v.updateUser.$pending) {
        let index = this.contacts.findIndex(
          item => item.id == this.updateUser.id
        );
        try {
          let contact = {
            id: this.updateUser.id,
            firstname: this.updateUser.firstname,
            lastname: this.updateUser.lastname,
            email: this.updateUser.email,
            phone: this.updateUser.phone,
            user_id: this.user_id
          };

          let result = await this.contactService.updateById(
            this.updateUser.id,
            contact
          );

          if (result) {
            this.contacts.splice(index, 1, contact);
            this.contacts[index] = contact;
            this.alert = [];
            this.alert.push("Contact is updated");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("not valid");
      }
      this.$v.updateUser.$reset();
    },

    handleAddSubmit: async function(res) {
      this.$v.addUser.$touch();
      if (this.$v.addUser.$error) {
        this.addUser.firstname = this.addUser.lastname = this.addUser.email = this.addUser.phone =
          "";
      } else {
        let result = await this.contactService.addContact(this.addUser);
        console.log(result);
        this.contacts = await this.contactService.getContactByUserId(
          this.user_id
        );
        this.addUser.firstname = this.addUser.lastname = this.addUser.email = this.addUser.phone =
          "";
        $("#add-close-btn").click();
        this.alert = [];
        this.alert.push("Contact is added");
      }
      this.$v.addUser.$reset();
    }
  }
};
</script>

<style>
.tabel {
  width: 60%;
  margin-left: 22%;
  margin-top: 2%;
  border: 1px solid black;
}
i {
  margin-top: 4px;
}
</style>