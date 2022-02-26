<template>
  <div id="container">
    <div class="page-header">
      <h1 class="text-center">연락처 관리 애플리케이션</h1>
      <p>(Dynamic Component + EventBus + Axios)</p>
    </div>
    <component :is="currentView" :contact="contact"></component>
    <contactList :contactlist="contactlist"></contactList>
  </div>
</template>

<script>
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import UpdateContact from "./components/UpdateContact";
import UpdatePhoto from "./components/UpdatePhoto";
import CONF from "./Config.js";
import eventBus from "./EventBus.js";

export default {
  name: "app",
  components: { ContactList, AddContact, UpdateContact, UpdatePhoto },
  data() {
    return {
      currentView: null,
      contact: { no: 0, name: "", tel: "", address: "", photo: "" },
      contactlist: {
        pageno: 1,
        pagesize: CONF.PAGESIZE,
        totalcount: 0,
        contacts: []
      }
    };
  },
  mounted() {
    this.fetchContacts();
    // ContactList.vue에서 $emit으로 호출한 이벤트를 $on으로 수신하여 처리하도록 한다.
    // 연락처 추가 폼이 나타날 수 있도록 currentView를 addContract로 수정한다.
    eventBus.$on("addContactForm", () => {
      this.currentView = "addContact";
    });
    // 변경폼에 기존 연락처 데이터가 나타날 수 있도록 no 인자를 이용해
    // fetchContractOne 메서드를 호출하고, currentView를 updatePhoto로 변경한다.
    eventBus.$on("editContactForm", no => {
      this.fetchContactOne(no);
      this.currentView = "updateContact";
    });
    eventBus.$on("editPhoto", no => {
      this.fetchContactOne(no);
      this.currentView = "updatePhoto";
    });
    eventBus.$on("cancel", () => {
      this.currentView = null;
    });
    // currentView는 null로 만들되 연락처는 추가하여야 한다.
    eventBus.$on("addSubmit", contact => {
      this.currentView = null;
      this.addContact(contact);
    });
    eventBus.$on("updateSubmit", contact => {
      this.currentView = null;
      this.updateContact(contact);
    });
    eventBus.$on("deleteContact", no => {
      this.deleteContact(no);
    });
    // 사진 변경 폼이 사라질 수 있도록 currentView는 null 로 만든다.
    eventBus.$on("updatePhoto", (no, file) => {
      if (typeof file !== "undefined") {
        this.updatePhoto(no, file);
      }
      this.currentView = null;
    });
    eventBus.$on("pageChanged", page => {
      this.pageChanged(page);
    });
  },
  methods: {
    // 보여줄 페이지를 변경한다.
    pageChanged(page) {
      this.contactlist.pageno = page;
      this.fetchContacts();
    },
    // 전체 연락처 데이터를 페이징하여 조회한다.
    fetchContacts() {
      this.$axios
        .get(CONF.FETCH, {
          params: {
            pageno: this.contactlist.pageno,
            pagesize: this.contactlist.pagesize
          }
        })
        .then(response => {
          this.contactlist = response.data;
        })
        .catch(ex => {
          console.log("fetchContacts failed", ex);
          this.contactlist.contacts = [];
        });
    },
    // 연락처 한 건을 추가한다.
    addContact(contact) {
      console.log("add!!");
      this.$axios
        .post(CONF.ADD, contact)
        .then(response => {
          if (response.data.status === "success") {
            this.contactlist.pageno = 1;
            this.fetchContacts();
          } else {
            console.log("연락처 추가 실패 : " + response.data.message);
          }
        })
        .catch(ex => {
          console.log("addContact failed : ", ex);
        });
    },
    // 연락처 한 건을 수정한다.
    updateContact(contact) {
      this.$axios
        .put(CONF.UPDATE.replace("${no}", contact.no), contact)
        .then(response => {
          if (response.data.status === "success") {
            this.fetchContacts();
          } else {
            console.log("연락처 변경 실패 : " + response.data.message);
          }
        })
        .catch(ex => {
          console.log("updateContact failed : ", ex);
        });
    },
    // 연락처 한 건을 조회한다.
    fetchContactOne(no) {
      this.$axios
        .get(CONF.FETCH_ONE.replace("${no}", no))
        .then(response => {
          this.contact = response.data;
        })
        .catch(ex => {
          console.log("fetchContactOne failed", ex);
        });
    },
    // 연락처 한 건을 삭제한다.
    deleteContact(no) {
      this.$axios
        .delete(CONF.DELETE.replace("${no}", no))
        .then(response => {
          if (response.data.status === "success") {
            this.fetchContacts();
          } else {
            console.log("연락처 삭제 실패 : " + response.data.message);
          }
        })
        .catch(ex => {
          console.log("delete failed", ex);
        });
    },
    // 연락처 한 건을 수정한다.
    updatePhoto(no, file) {
      var data = new FormData();
      data.append("photo", file);
      this.$axios
        .post(CONF.UPDATE_PHOTO.replace("${no}", no), data)
        .then(response => {
          if (response.data.status === "success") {
            this.fetchContacts();
          } else {
            console.log("연락처 사진 변경 실패 : " + response.data.message);
          }
        })
        .catch(ex => {
          console.log("updatePhoto failed", ex);
        });
    }
  }
};
</script>

<style scoped>
#container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>