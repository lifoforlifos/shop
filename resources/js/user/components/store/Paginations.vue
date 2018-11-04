<template>
                <!-- Pagination -->
            <nav aria-label="navigation">
              <ul class="pagination mt-50 mb-70 flex-wrap">
                <li :class="{ disabled: !pagination.first_link} " class="page-item"><a class="page-link" @click="filter(pagination.first_link)"><i
                      class="fa fa-angle-left color-change"></i></a></li>
                <li :class="{ disabled: !pagination.prev_link} " class="page-item"><a class="color-change page-link"
                    @click="filter(pagination.prev_link)">&lt;</a></li>
                <li v-for="n in pagination.last_page" :key="n" :class="{ active: pagination.current_page == n} "
                  class="page-item"><a class="page-link" @click="filter(pagination.path_page + n)">{{
                    n }}</a></li>
                <li :class="{ disabled: !pagination.next_link} " class="page-item"><a class="page-link" @click="filter(pagination.next_link)">&gt;</a></li>
                <li :class="{ disabled: !pagination.last_link} " class="page-item"><a class="page-link" @click="filter(pagination.last_link)"><i
                      class="fa fa-angle-right color-change"></i></a></li>
              </ul>
            </nav>
</template>

<script>
export default {
  name: "pagination",
  computed: {
    pagination() {
      return this.$store.getters.pagination;
    }
  },
  methods: {
    filter(link) {
      this.$store.dispatch("getProducts", link);
    }
  }
};
</script>
