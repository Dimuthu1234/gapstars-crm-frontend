<template>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <main role="main" class="col-md-12 ml-sm-auto col-lg-10 px-4">
        <div
            class="d-md-flex d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <div class="col-md-4">
            <h1 class="h2">{{ $auth.user.name + "'s Profile" }}</h1>
          </div>
          <div class="col-md-4">
                           <span class="btn btn-primary btn-file" style="width: 100%">
                              Pick CSV
                              <input
                                  v-b-tooltip.hover
                                  title="Pick CSV"
                                  id="file-input"
                                  ref="file"
                                  type="file"
                                  accept="text/csv"
                                  @change="selectCSV"
                              />
                          </span>
          </div>
          <div class="col-md-4">
            <b-button
                @click="uploadCSV($auth.user.id)"
                class="btn btn-primary btn-file"
            >Import my data from CSV
            </b-button>
          </div>

        </div>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="card-title mb-4">
                  <div class="d-flex justify-content-start">
                    <div class="image-container">
                      <img src="http://placehold.it/150x150" id="imgProfile" style="width: 150px; height: 150px"
                           class="img-thumbnail"/>
                      <div class="middle">
                        <input type="button" class="btn btn-secondary" id="btnChangePicture" value="Change"/>
                        <input type="file" style="display: none;" id="profilePicture" name="file"/>
                      </div>
                    </div>
                    <div class="userData ml-3">
                      <h2 class="d-block" style="font-size: 1.5rem; font-weight: bold"><a
                          href="javascript:void(0);">{{ $auth.user.name }}</a></h2>
                      <h6 class="d-block"><a href="javascript:void(0)">{{ $auth.user.email }}</a></h6>
                    </div>
                    <div class="ml-auto">
                      <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes"/>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="basicInfo-tab" data-toggle="tab" href="#basicInfo" role="tab"
                           aria-controls="basicInfo" aria-selected="true">Basic Information</a>
                      </li>
                    </ul>
                    <div class="tab-content ml-1" id="myTabContent">
                      <div class="tab-pane fade show active" id="basicInfo" role="tabpanel"
                           aria-labelledby="basicInfo-tab">


                        <div class="row">
                          <div class="col-sm-3 col-md-2 col-5">
                            <label style="font-weight:bold;">Full Name</label>
                          </div>
                          <div class="col-md-8 col-6">
                            {{ $auth.user.name }}
                          </div>
                        </div>
                        <hr/>

                        <div class="row">
                          <div class="col-sm-3 col-md-2 col-5">
                            <label style="font-weight:bold;">E-mail Address</label>
                          </div>
                          <div class="col-md-8 col-6">
                            {{ $auth.user.email }}
                          </div>
                        </div>
                        <hr/>

                        <div class="row">
                          <div class="col-sm-3 col-md-2 col-5">
                            <label style="font-weight:bold;">Birth Date</label>
                          </div>
                          <div class="col-md-8 col-6">
                            {{ $auth.user.dob }}
                          </div>
                        </div>
                        <hr/>


                        <div class="row">
                          <div class="col-sm-3 col-md-2 col-5">
                            <label style="font-weight:bold;">Telephone</label>
                          </div>
                          <div class="col-md-8 col-6">
                            {{ $auth.user.telephone }}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3 col-md-2 col-5">
                            <label style="font-weight:bold;">Town</label>
                          </div>
                          <div class="col-md-8 col-6">
                            {{ $auth.user.town }}
                          </div>
                        </div>
                        <hr/>
                        <div class="row">
                          <div class="col-sm-3 col-md-2 col-5">
                            <label style="font-weight:bold;">Country</label>
                          </div>
                          <div class="col-md-8 col-6">
                            {{ $auth.user.country }}
                          </div>
                        </div>
                        <hr/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Loader from "../../components/common/Loader";
import OrderPerson from "../../components/admin/OrderPerson";
import Sidebar from "../../components/admin/Sidebar";

export default {
  components: {
    OrderPerson,
    Loader,
    Sidebar
  },
  layout: "admin",
  middleware: "auth",
  data() {
    return {
      loading: true,
      selectedFile: null,
    };
  },

  methods: {
    selectCSV(event) {
      this.selectedFile = event.target.files[0]
    },

    uploadCSV(userId) {
      const formData = new FormData();
      formData.append('csv_file', this.selectedFile);

      this.$axios.setBaseURL("http://localhost:8000");
      this.$axios.post('api/user/' + userId + '/import-csv?_method=PUT', formData, {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(() => {
            this.$auth.fetchUser()
            this.$toast.success('User CSV imported successfully')
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
};
</script>

<style lang="scss">

.image-container {
  position: relative;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.image-container:hover .image {
  opacity: 0.3;
}

.image-container:hover .middle {
  opacity: 1;
}


.preloader-loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.66);
  z-index: 999;

  .loader {
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
    color: #fff;
  }
}

.recent-orders-box {
  margin-top: 30px;

  .title {
    position: relative;

    h3 {
      margin-bottom: 15px;
      font: {
        size: 20px;
        weight: 600;
      }
    }

    ul {
      padding-left: 0;
      margin-bottom: 0;
      list-style-type: none;
      position: absolute;
      right: 0;
      top: -10px;

      li {
        display: inline-block;
        margin-left: 5px;

        a,
        button {
          display: block;
          background-color: #f2f2f2;
          color: #000000;
          padding: 5px 15px;
          border: none;
          transition: 0.5s;

          &:hover {
            background-color: #000000;
            color: #fff;
          }
        }

        &:nth-child(2) {
          a,
          button {
            &:hover {
              background-color: red;
              color: #fff;
            }
          }
        }

        &:nth-child(3) {
          a,
          button {
            &:hover {
              background-color: green;
              color: #fff;
            }
          }
        }
      }
    }
  }

  table {
    margin-bottom: 0;

    thead {
      th {
        text-align: left;
        white-space: nowrap;
        padding: 15px 15px 15px 0;
        border-bottom: 1px solid #f6f6f7;
        border-color: #f6f6f7;
        font-size: 15px;
      }
    }

    tbody {
      tr {
        td {
          padding: 15px;
          vertical-align: middle;
          white-space: nowrap;
          border-bottom: 1px solid #f6f6f7;
          border-top: none;
          font-size: 14.4px;

          &:first-child {
            padding-left: 0;
          }

          &.name {
            font-weight: 700;
          }

          img {
            width: 50px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/*
 * Content
 */

[role="main"] {
  padding-top: 133px; /* Space for fixed navbar */
}

@media (min-width: 768px) {
  [role="main"] {
    padding-top: 48px; /* Space for fixed navbar */
  }
}
</style>
